import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import { UserProvider } from './app/provider/UserProvider';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51QSN24F0vtTqyExL1FYAvmUAwues9k4TSEHGNcodQaiZrmKOzLi2qR01u4MpmuXUeTQYDCc7SveqWdJHBloMuHRz00WIVew8vy',
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <UserProvider>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </UserProvider>
  </React.StrictMode>,
);
