import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../features/home/HomePage";
import ActivitiesDashboard from "../features/activities/dashboard/ActivitiesDashboard";
import ActivityForm from "../features/activities/form/ActivityForm";
import ActivitiesDetails from "../features/activities/details/ActivitiesDetails";
import TestErrors from "../features/errors/TestError";
import NotFound from "../features/errors/NotFound";
import ServerError from "../features/errors/ServerError";

const routes: RouteObject[] = [{
    path:"/",
    element: <App/>,
    children: [{
        path: '',
        element: <HomePage/>
    },{
        path: 'activities',
        element: <ActivitiesDashboard/>
    },{
        path: 'createActivity',
        element: <ActivityForm key="create"/>
    },{
        path: 'activities/:id',
        element: <ActivitiesDetails/>
    },{
        path:'manage/:id',
        element: <ActivityForm key="manage"/>
    },
    {
        path: 'errors',
        element: <TestErrors/>
    },
    {
        path: 'not-found',
        element: <NotFound/>
    },{
        path: 'server-error',
        element: <ServerError/>
    },{
        path: '*',
        element: <Navigate replace to='/not-found'/>
    }
]
}]

const router = createBrowserRouter(routes)

export { routes, router }