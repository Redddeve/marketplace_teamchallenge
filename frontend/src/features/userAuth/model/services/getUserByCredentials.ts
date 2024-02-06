import { createAsyncThunk } from '@reduxjs/toolkit';
import Bowser from 'bowser';
import Cookies from 'js-cookie';

import { User, userActions } from '@/enteties/User';
import { $api } from '@/shared/api/api';
import {
  COOKIE_KEY_EXPIRATION_DATE_OF_USER,
  COOKIE_KEY_TOKEN,
  COOKIE_KEY_USER,
} from '@/shared/const/cookies';

const EXPIRES_TIME = 7;

interface ApiResponse {
  token: string;
  message: string;
  user: User;
}

interface LoginByUsernameProps {
  email: string;
  password: string;
}

const cookiesAttr: Cookies.CookieAttributes = {
  expires: EXPIRES_TIME,
  secure: true,
};

export const getUserByCredentials = createAsyncThunk<ApiResponse, LoginByUsernameProps>(
  'login/getUserByCredentials',
  async (authData, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;

    try {
      const browser = Bowser.getParser(navigator.userAgent);
      const info = browser.getResult();

      const response = await $api.post<ApiResponse>('/auth', { ...authData, info });

      console.log({ ...authData, browser });

      const { token } = response.data;

      const currentDate = new Date();
      const futureDate = new Date(currentDate);

      futureDate.setDate(currentDate.getDate() + EXPIRES_TIME);

      if (response.status !== 200) {
        return rejectWithValue(`:: ${response.statusText} `);
      }

      // Set cookies for user, token, expiration date when user removes from cookies
      Cookies.set(COOKIE_KEY_TOKEN, token, cookiesAttr);
      Cookies.set(COOKIE_KEY_USER, JSON.stringify(response.data.user), cookiesAttr);
      Cookies.set(
        COOKIE_KEY_EXPIRATION_DATE_OF_USER,
        futureDate.toISOString(),
        cookiesAttr,
      );

      dispatch(userActions.setAuthData(response.data.user));

      return response.data;
    } catch (e: any) {
      return rejectWithValue(`:: ${e.message as string}`);
    }
  },
);