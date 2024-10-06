import { SharedLayout } from 'pages/SharedLayout';
import { HomePage } from 'pages/HomePage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { ContactsPage } from 'pages/ContactsPage';

export const App = () => {
  // const isLoggedIn = true;

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />

          {/* CONTACTS PAGE IS RESTRICTED AND IS ONLY ACCESSIBLE BY SUCCESSFULLY REGISTERING IN THE REGISTER PAGE */}
          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/login" component={RegisterPage} />
            }
          />
          {/* CONTACTS PAGE IS RESTRICTED AND IS ONLY ACCESSIBLE BY SUCCESSFULLY LOGGING IN THE LOGIN PAGE */}
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts" component={LoginPage} />
            }
          />
        </Route>
        {/* CONTACTS PAGE IS PRIVATE AND IS REDIRECTED TO LOGIN PAGE IF USER IS NOT AUTHENTICATED*/}
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={ContactsPage} />
          }
        />
      </Routes>

      {/* conditional rendering */}
      {/* {isLoggedIn ? (
        <div>The user is logged in!</div>
      ) : (
        <div>The user is logged out!</div>
      )} */}
    </>
  );
};

// if isLoggedIn is true, we will show the div with the logged in string.
// if isLoggedIn is false, we will show the div with the logged out string.
