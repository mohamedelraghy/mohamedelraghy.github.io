import { RouterProvider } from 'react-router/dom';

import { browserRouter } from '@/router';

export const AppContainer = () => (
    <RouterProvider router={browserRouter} />
);
