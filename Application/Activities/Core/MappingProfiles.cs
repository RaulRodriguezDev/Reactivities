using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUsername, options => options.MapFrom(s => s.Atendees
                .FirstOrDefault(x => x.IsHost).AppUser));
            CreateMap<ActivityAtendee, Profiles.Profile>()
                .ForMember(d => d.DisplayName, options => options.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, options => options.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, options => options.MapFrom(s => s.AppUser.Bio));
        }
    }
}
