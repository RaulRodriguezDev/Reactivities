using Application.Activities.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command: IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _contex;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext contex, IUserAccessor userAccessor)
            {
                _contex = contex;
                _userAccessor = userAccessor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _contex.Activities.Include(a => a.Atendees).ThenInclude(u => u.AppUser).FirstOrDefaultAsync(x => x.Id == request.Id);

                if (activity == null) return null;

                var user = await _contex.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var hostUsername = activity.Atendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var attendance = activity.Atendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (attendance != null && hostUsername == user.UserName)
                    activity.IsCancelled = !activity.IsCancelled;

                if (attendance != null && hostUsername != user.UserName)
                    activity.Atendees.Remove(attendance);

                if(attendance == null)
                {
                    attendance = new Domain.ActivityAtendee
                    {
                        AppUser = user,
                        Activity = activity,
                        IsHost = false
                    };

                    activity.Atendees.Add(attendance);
                }

                var result = await _contex.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updatring attendance");
            }
        }
    }
}
