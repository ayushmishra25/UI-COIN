import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import  store, { persistor }  from  "../src/redux/Store/store"
import { SnackbarProvider } from 'notistack';
import { SnackbarProvider as CustomSnackbarProvider } from './component/SnackbarContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './i18n/config'; // Initialize i18n
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SnackbarProvider 
  maxSnack={3} 
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
>
<CustomSnackbarProvider>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
  <React.StrictMode>
  <GoogleOAuthProvider clientId=
   "873652672045-vmi4hk4r35klcths3idmm5r2nq1idis0.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
  </PersistGate>
  </Provider>
  </CustomSnackbarProvider>
  </SnackbarProvider>

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
// import  store  from  "../src/redux/Store/store"
// import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist';
//  const persistor = persistStore(store)
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <Provider store={store}>
// <PersistGate loading={null} persistor={persistor}>
//     <App />
//     </PersistGate>
//   </Provider>,
// )
