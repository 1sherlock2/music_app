import React from 'react';
import Playlist from '../fragments/Playlist/Playlist';
import Auth from '../fragments/Auth/Auth';

import ProtectedRoute from './ProtectedRoute';
import BrowserPage from '../fragments/BrowserPage/BrowserPage';
import { Navigate, useRoutes } from 'react-router-dom';
import ErrorFallback from '../fragments/ErrorFallback/ErrorFallback';
import Settings from '../fragments/Settings/Settings';

const AppRoutes = () => {
  const routes = [
    {
      path: '/',
      children: [
        {
          index: true,
          element: <ProtectedRoute component={Playlist} />
        },
        {
          path: 'login',
          element: <Auth />
        },
        {
          path: 'browser',
          element: <ProtectedRoute component={BrowserPage} />
        },
        {
          path: 'settings',
          element: <ProtectedRoute component={Settings} />
        },
        {
          path: '/',
          element: <Navigate to="/auth" />
        }
      ]
    }
  ];
  return useRoutes(routes);
};
export default AppRoutes;

// const AppRoutes = () => (
//   <Routes>
//     <Route path="/">
//       <Route index element={<ProtectedRoute component={Playlist} />} />
//       <Route path="login" element={<Auth />} />
//       <Route
//         path="browser"
//         element={<ProtectedRoute component={BrowserPage} />}
//       />
//     </Route>
//   </Routes>
// );
// export default AppRoutes;

// const Routes = () => {

//   const routes = createBrowserRouter([
//     {
//       path: '/',
//       element: <ProtectedRoute component={Playlist} />

//     },
// {
//   path: 'login',
//   element: <Auth />
// },
// {
//   path: 'browser',
//   element: <BrowserPage />
// }
//   ]);

//   return useRoutes(routes)
// }

// {
//   return (
//     <Switch>
//       <Route path="/login" component={Auth} />
//       <ProtectedRoute path="/" component={Playlist} exact />
//       <ProtectedRoute path="/browser" component={BrowserPage} />
//     </Switch>
//   );
// };

// const AppRoutes = () => {
//   const routes = [
//     {
//       path: '/',
//       children: [
//         {
//           path: '/',
//           element: <ProtectedRoute component={Playlist} />
//         },
//         {
//           path: 'login',
//           element: <Auth />
//         },
//         {
//           path: 'browser',
//           element: <ProtectedRoute component={BrowserPage} />
//         }
//       ]
//     }
//   ];

//   return useRoutes(routes);
// };

// export default AppRoutes;
