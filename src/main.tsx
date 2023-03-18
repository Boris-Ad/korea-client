import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './style/reset.scss';
import './style/main.scss';
import ErrorPage from './error-page';
import HomePage, { loader as HomePageLoader } from './routes/home';
import RootPage from './routes/root';
import AccountPage from './routes/account';
import BasketPage from './routes/basket';
import AdminPage, { action as AdminPageAction } from './routes/admin';
import OrdersPage from './routes/orders';
import EditPage, { action as EditPageAction } from './routes/edit';
import CreatePage, { action as CreatePageAction } from './routes/create';
import HistoryPage, { loader as HistoryPageLoader } from './routes/history';
import OnSalePage, { loader as OnSalePageLoader } from './routes/on_sale';
import { action as deleteProductAction } from './routes/destroy';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage />, id: 'home', loader: HomePageLoader },
          { path: 'account', element: <AccountPage /> },
          { path: 'basket', element: <BasketPage />, id: 'basket', loader: HomePageLoader },
        ],
      },
    ],
  },
  { path: '/orders', element: <OrdersPage /> },
  {
    path: '/admin',
    element: <AdminPage />,
    action: AdminPageAction,
    children: [{ index: true, element: <OnSalePage />, errorElement: <ErrorPage />, loader: OnSalePageLoader }],
  },
  { path: '/edit', element: <EditPage />, action: EditPageAction },
  { path: '/:path/create', element: <CreatePage />, action: CreatePageAction },
  { path: '/history/:orders', element: <HistoryPage />, loader: HistoryPageLoader },
  { path: '/:file/destroy', action: deleteProductAction,errorElement: <ErrorPage />},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
