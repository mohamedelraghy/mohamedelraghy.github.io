import { createBrowserRouter } from 'react-router';

import { PATHS } from './constants';

import { App, NotFound } from '@/app/components';
import { HomePage } from './pages';

export const browserRouter = createBrowserRouter([{
    path: PATHS.HOME,
    element: <App />,
    children: [{
        index: true,
        element: <HomePage />
    }, {
        path: '*',
        element: <NotFound />
    }]
}]);
