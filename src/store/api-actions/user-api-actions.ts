import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatchType } from '../../types/state-types';
import { AxiosInstance } from 'axios';
import { StateType } from '../../types/state-types';
import { APIRoutes } from '../../const/api-const';
import { isClientDomainLocalhost } from '../../utils';
import { Symbols } from '../../const/common-const';
import { ApiResponseType } from '../../types/api-types';

import {
  getRefreshTokenFromStorage,
  checkRefreshTokenSetInStorage
} from '../../services/local-storage';

import {
  ConfirmBodyType,
  ConfirmPayloadType,
  LoginBodyType,
  LoginPayloadType,
  LogoutPayloadType,
  NewPasswordBodyType,
  NewPasswordPayloadType,
  RefreshPayloadType,
  RegisterBodyType,
  RegisterPayloadType,
  RepassBodyType,
  RepassPayloadType
} from '../../types/user-types';

export const registerUserAction = createAsyncThunk<ApiResponseType<RegisterPayloadType>, RegisterBodyType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}
>
(
  'registerUserAction',
  async ({ firstName, lastName, email, password, repeatPassword }, { extra: api }) => {
    const { data } = await api.post<ApiResponseType<RegisterPayloadType>>(
      APIRoutes.Register,
      { firstName, lastName, email, password, repeatPassword }
    );

    return data;
  }
);

export const loginUserAction = createAsyncThunk<ApiResponseType<LoginPayloadType>, LoginBodyType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}
>
(
  'loginAction',
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<ApiResponseType<LoginPayloadType>>(APIRoutes.Login, { email, password });

    return data;
  }
);

export const confirmUserAction = createAsyncThunk<ApiResponseType<ConfirmPayloadType>, ConfirmBodyType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}
>
(
  'confirmUserAction',
  async ({ confirmId }, { extra: api }) => {
    const { data } = await api.post<ApiResponseType<ConfirmPayloadType>>(APIRoutes.Confirm, { confirmId });

    return data;
  }
);

export const repassUserAction = createAsyncThunk<ApiResponseType<RepassPayloadType>, RepassBodyType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}
>
(
  'repassUserAction',
  async ({ email }, { extra: api }) => {
    const { data } = await api.post<ApiResponseType<RepassPayloadType>>(APIRoutes.Repass, { email });

    return data;
  }
);

export const newPasswordUserAction = createAsyncThunk<ApiResponseType<NewPasswordPayloadType>, NewPasswordBodyType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}
>
(
  'newPasswordUserAction',
  async ({ repassId, newPassword, newRepeatPassword }, { extra: api }) => {
    const { data } = await api.post<ApiResponseType<NewPasswordPayloadType>>(APIRoutes.NewPassword, { repassId, newPassword, newRepeatPassword });

    return data;
  }
);

export const logoutUserAction = createAsyncThunk<ApiResponseType<LogoutPayloadType>, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}
>
(
  'logoutUserAction',
  async (_arg, { extra: api }) => {
    // const { data } = await api.get<ApiResponseType<LogoutPayloadType>>(APIRoutes.Logout);

    // return data;

    let response;

    switch (true) {
      case isClientDomainLocalhost():
        const isRefreshTokenSetInStorage = checkRefreshTokenSetInStorage();
        const refreshToken = isRefreshTokenSetInStorage ? getRefreshTokenFromStorage() : Symbols.Empty;

        response = await api.post<ApiResponseType<LogoutPayloadType>>(APIRoutes.Logout, { refreshToken });
        break;
    
      default:
        response = await api.get<ApiResponseType<LogoutPayloadType>>(APIRoutes.Logout);
        break;
    }

    return response.data;
  }
);

export const refreshAuthAction = createAsyncThunk<ApiResponseType<RefreshPayloadType>, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}
>
(
  'refreshAuthAction',
  async (_args, { extra: api }) => {
    let response;

    switch (true) {
      case isClientDomainLocalhost():
        const isRefreshTokenSetInStorage = checkRefreshTokenSetInStorage();
        const refreshToken = isRefreshTokenSetInStorage ? getRefreshTokenFromStorage() : Symbols.Empty;

        response = await api.post<ApiResponseType<RefreshPayloadType>>(APIRoutes.Refresh, { refreshToken });
        break;
    
      default:
        response = await api.get<ApiResponseType<RefreshPayloadType>>(APIRoutes.Refresh);
        break;
    }

    return response.data;
  }
);

