import { LanguageCodes } from './languages-const';

export const WEBPACK_DEVSERVER_PORT = 4000;
export const EXPRESS_DEVSERVER_PORT = 3002;
export const API_URL_PROD = 'https://api.drmsystem.org';
export const API_URL_DEV = 'https://api.drmsystemdev.ru';
export const CLIENT_URL_PROD = 'https://drmsystem.org';
export const CLIENT_URL_LOCALHOST = `http://localhost:${WEBPACK_DEVSERVER_PORT}`;
export const REQUEST_TIMEOUT = 10000;

export enum APIMethods {
  GET = 'GET',
  POST = 'POST'
}

export enum APIRoutes {
  Register = '/register',
  Login = '/login',
  Confirm = '/confirm',
  Repass = '/repass',
  NewPassword = '/newpassword',
  Logout = '/logout',
  Refresh = '/refresh'
}

export enum APIActions {
  Register = 'register',
  Login = 'login',
  Confirm = 'confirm',
  Repass = 'repass',
  NewPassword = 'newPassword',
  Logout = 'logout',
  Refresh = 'refresh'
}

export const API_MESSAGES = {
  FILED: {
    [LanguageCodes.Russian]: 'Запрос на сервер не удался, проверьте интернет, либо попробуйте позже',
    [LanguageCodes.English]: 'Request to the server failed, please check your internet connection or try again later'
  }
};
