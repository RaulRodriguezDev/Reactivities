import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../features/home/HomePage";
import ActivitiesDashboard from "../features/activities/ActivitiesDashboard";
import ActivityForm from "../features/ActivityForm";
import ActivitiesDetails from "../features/ActivitiesDetails";

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
    }
]
}]

const router = createBrowserRouter(routes)

export { routes, router }