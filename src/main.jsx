import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { EventPage } from './pages/EventPage';
import { EventsPage, loader as eventsPageLoader } from "./pages/EventsPage";
import {  loader as eventPageLoader } from "./pages/EventPage";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './components/Root';

console.log(localStorage);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <EventsPage />,
        loader: eventsPageLoader,
      },
      {
        path: '/event/:eventId',
        element: <EventPage />,
        loader: eventPageLoader,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
);
