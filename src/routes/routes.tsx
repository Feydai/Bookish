import { createBrowserRouter, RouteObject } from 'react-router-dom';
import SignIn from '../routes/SignIn/SignIn';
import PickFavorite from '../routes/PickFavorite/PickFavorite';

const routesConfig: RouteObject[] = [
    {
        path: '/',
        element: <SignIn />,
    },
    {
        path: '/pickFavorite',
        element: <PickFavorite />,
    },
];

export const router = createBrowserRouter(routesConfig);
