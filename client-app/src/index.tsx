import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import { StoreContext, store } from './app/stores/store';
import { router } from './app/router/Routes';
import { RouterProvider } from 'react-router-dom'
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.min.css'
import './app/layout/styles.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StoreContext.Provider value={store}>
      <React.StrictMode>
        <RouterProvider router={router}/>
      </React.StrictMode>
  </StoreContext.Provider>

);

