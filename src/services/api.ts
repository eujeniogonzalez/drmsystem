import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { APIActions, REQUEST_TIMEOUT } from '../const/api-const';
import { store } from '../store';
import { getAPIURL, isAccessTokenExpired, syntheticAPIDelay } from '../utils';
import { adaptFromClientToServer, adaptFromServerToClient } from './adapter';
import { refreshAuthAction } from '../store/api-actions/user-api-actions';
import { NameSpace } from '../const/common-const';
import { StartApiTimeType } from '../types/api-types';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: getAPIURL(),
    timeout: REQUEST_TIMEOUT,
    withCredentials: true
  });

  let startAPITime: StartApiTimeType = 0;

  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const accessToken = store.getState()[NameSpace.User].accessToken;
      const isAPIActionRefresh = store.getState()[NameSpace.User].userActionType === APIActions.Refresh;

      startAPITime = !isAPIActionRefresh ? new Date().getTime() : null;

      switch (true) {
        case accessToken && !isAccessTokenExpired(accessToken):
          config.headers['authorization'] = `Bearer ${accessToken}`;
          break;
      
        case accessToken && isAccessTokenExpired(accessToken) && !isAPIActionRefresh:
          await store.dispatch(refreshAuthAction());

          const newAccessToken = store.getState()[NameSpace.User].accessToken;

          config.headers['authorization'] = `Bearer ${newAccessToken}`;
          break;
      }

      config.headers['language-code'] = store.getState()[NameSpace.User].languageCode;

      if (!config.data) return config;
      
      config.data = adaptFromClientToServer(config.data);

      return config;
    }
  );

  api.interceptors.response.use(
    async (response) => {
      if (!response.data) return response;

      response.data = adaptFromServerToClient(response.data);

      await syntheticAPIDelay(startAPITime);

      return response;
    }
  );

  return api;
};

