import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://node-phonebook-api.onrender.com/api';

// Utility to add JWT
const setAuthHeader = token => {
  console.log('Setting Authorization header with token:', token); // Debugging the token
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  console.log('Clearing Authorization header'); // Log when the header is cleared
  axios.defaults.headers.common.Authorization = '';
};

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, thunkAPI) => {
    try {
      console.log('Sending signup request with data:', {
        name,
        email,
        password,
      }); // Log the data before sending request
      const response = await axios.post('/users/signup', {
        name,
        email,
        password,
      });
      console.log('Signup response received:', response); // Log the response data
      // setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      console.log('Signup error:', error.message); // Log error details
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      console.log('Sending login request with data:', { email, password }); // Log the data before sending request
      const response = await axios.post('/users/login', { email, password });
      console.log('Login response received:', response.data); // Log the response data
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      console.log('Login error:', error.message); // Log error details
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    console.log('Sending logout request'); // Log when the logout request is sent
    await axios.get('/users/logout');
    clearAuthHeader();
    console.log('Logout successful'); // Log successful logout
  } catch (error) {
    console.log('Logout error:', error.message); // Log error details
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    console.log('Persisted token from state:', persistedToken); // Log the persisted token

    if (persistedToken === null) {
      // If there is no token, exit without performing any request
      console.log('No token found in state, aborting request'); // Log when token is missing
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      console.log('Sending request to fetch current user'); // Log when fetching current user
      const res = await axios.get('/users/current');
      console.log('Fetch user response received:', res.data); // Log the response data
      return res.data;
    } catch (error) {
      console.log('Fetch user error:', error.message); // Log error details
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
