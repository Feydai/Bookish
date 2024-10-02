import { createBrowserRouter, RouteObject } from 'react-router-dom';
import SignIn from '../routes/SignIn/SignIn';
import PickFavorite from '../routes/PickFavorite/PickFavorite';
import BookPreview from '../routes/BookPreview/BookPreview';

const routesConfig: RouteObject[] = [
    {
        path: '/',
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
