import { createBrowserRouter, RouteObject } from 'react-router-dom';

import SignIn from '../routes/SignIn/SignIn';
import SignUp from '../routes/SignUp/SignUp';

import PickFavorite from '../routes/PickFavorite/PickFavorite';
import BookPreview from '../routes/BookPreview/BookPreview';

const routesConfig: RouteObject[] = [
    {
        path: '/',
        element: <SignUp />,
    },
    {
        path: '/signIn',
        element: <SignIn />,
    },
    {
        path: '/pickFavorite',
        element: <PickFavorite />,
    },
    {
        path: '/bookPreview/:bookId',
        element: <BookPreview />,
    },
];

export const router = createBrowserRouter(routesConfig);
