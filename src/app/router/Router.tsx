import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';

import RootLayout from '../layout/RootLayout';
import { Error, Home } from '../../pages';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />

            <Route path="*" element={<Error />} />
        </Route>
        </>,
    ),
);
export default router;