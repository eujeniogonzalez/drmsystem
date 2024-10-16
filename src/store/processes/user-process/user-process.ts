import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, AuthStatuses, Symbols, UserRoles } from '../../../const/common-const';
import { APIActions } from '../../../const/api-const';
import { getEnumKeyByValue, getUserIdByAccessToken, getUserRoleByAccessToken } from '../../../utils';
import { UserProcessType } from '../../../types/user-types';

import {
  refreshAuthAction,
  loginUserAction,
  registerUserAction,
  confirmUserAction,
  repassUserAction,
  newPasswordUserAction,
  logoutUserAction
} from '../../api-actions/user-api-actions';

import {
  deleteRefreshTokenFromStorage,
  getLanguageCodeFromStorage,
  checkRefreshTokenSetInStorage,
  setRefreshTokenToStorage
} from '../../../services/local-storage';
import { LanguageCodes } from '../../../const/languages-const';

function detectLanguageCode(): LanguageCodes {
  const languageCodeFromStorage = getLanguageCodeFromStorage();
  const languageCodeEnumKey = getEnumKeyByValue<typeof LanguageCodes>(languageCodeFromStorage, LanguageCodes);

  if (languageCodeEnumKey) {
    return LanguageCodes[languageCodeEnumKey];
  }

  return LanguageCodes.English;
}

const initialState: UserProcessType = {
  isUserRequestInProgress: false,
  authorizationStatus: AuthStatuses.Unknown,
  accessToken: Symbols.Empty,
  userRole: UserRoles.Unknown,
  userId: null,
  languageCode: detectLanguageCode(),
  userActionType: null,
  isUserResponseSuccess: false,
  userResponseMessage: null
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    resetUserStateAction: (state) => {
      Object.assign(state, initialState);
    },
    setLanguageCodeAction: (state, action) => {
      state.languageCode = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      // Register user
      .addCase(registerUserAction.pending, (state) => {
        state.isUserRequestInProgress = true;
        state.userActionType = APIActions.Register;
        state.isUserResponseSuccess = false;
        state.userResponseMessage = null;
      })
      .addCase(registerUserAction.fulfilled, (state, action) => {
        state.isUserRequestInProgress = false;
        state.isUserResponseSuccess = action.payload.success;
        state.userResponseMessage = action.payload.message;
      })
      .addCase(registerUserAction.rejected, (state) => {
        state.isUserRequestInProgress = false;
      })

      // Login user
      .addCase(loginUserAction.pending, (state) => {
        state.isUserRequestInProgress = true;
        state.userActionType = APIActions.Login;
        state.isUserResponseSuccess = false;
        state.userResponseMessage = null;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        const isSuccess = action.payload.success;
        const accessToken = isSuccess ? action.payload.payload.accessToken : Symbols.Empty;
        const refreshToken = (isSuccess && action.payload.payload.refreshToken) ? action.payload.payload.refreshToken : null;
        
        state.isUserRequestInProgress = false;
        state.isUserResponseSuccess = isSuccess;
        state.userResponseMessage = action.payload.message;
        state.authorizationStatus = isSuccess ? AuthStatuses.Auth : AuthStatuses.NoAuth;
        state.accessToken = accessToken;
        state.userRole = isSuccess ? getUserRoleByAccessToken(accessToken) : UserRoles.Unknown;
        state.userId = isSuccess ? getUserIdByAccessToken(accessToken) : null;

        if (refreshToken) setRefreshTokenToStorage(refreshToken);
      })
      .addCase(loginUserAction.rejected, (state) => {
        state.isUserRequestInProgress = false;
        state.authorizationStatus = AuthStatuses.NoAuth;
        state.accessToken = Symbols.Empty;
      })

      // Confirm user
      .addCase(confirmUserAction.pending, (state) => {
        state.isUserRequestInProgress = true;
        state.userActionType = APIActions.Confirm;
        state.isUserResponseSuccess = false;
        state.userResponseMessage = null;
      })
      .addCase(confirmUserAction.fulfilled, (state, action) => {
        state.isUserRequestInProgress = false;
        state.isUserResponseSuccess = action.payload.success;
        state.userResponseMessage = action.payload.message;
      })
      .addCase(confirmUserAction.rejected, (state) => {
        state.isUserRequestInProgress = false;
      })

      // Repass
      .addCase(repassUserAction.pending, (state) => {
        state.isUserRequestInProgress = true;
        state.userActionType = APIActions.Repass;
        state.isUserResponseSuccess = false;
        state.userResponseMessage = null;
      })
      .addCase(repassUserAction.fulfilled, (state, action) => {
        state.isUserRequestInProgress = false;
        state.isUserResponseSuccess = action.payload.success;
        state.userResponseMessage = action.payload.message;
      })
      .addCase(repassUserAction.rejected, (state) => {
        state.isUserRequestInProgress = false;
      })

      // New password
      .addCase(newPasswordUserAction.pending, (state) => {
        state.isUserRequestInProgress = true;
        state.userActionType = APIActions.NewPassword;
        state.isUserResponseSuccess = false;
        state.userResponseMessage = null;
      })
      .addCase(newPasswordUserAction.fulfilled, (state, action) => {
        state.isUserRequestInProgress = false;
        state.isUserResponseSuccess = action.payload.success;
        state.userResponseMessage = action.payload.message;
      })
      .addCase(newPasswordUserAction.rejected, (state) => {
        state.isUserRequestInProgress = false;
      })

      // Logout
      .addCase(logoutUserAction.pending, (state) => {
        state.isUserRequestInProgress = true;
        state.userActionType = APIActions.Logout;
        state.isUserResponseSuccess = false;
        state.userResponseMessage = null;
      })
      .addCase(logoutUserAction.fulfilled, (state, action) => {
        const isRefreshTokenSetInStorage = checkRefreshTokenSetInStorage();

        state.isUserRequestInProgress = false;
        state.isUserResponseSuccess = action.payload.success;
        state.userResponseMessage = action.payload.message;
        state.authorizationStatus = AuthStatuses.NoAuth;
        state.accessToken = Symbols.Empty;
        state.userRole = UserRoles.Unknown;
        state.userId = null;

        if (isRefreshTokenSetInStorage) deleteRefreshTokenFromStorage();
      })
      .addCase(logoutUserAction.rejected, (state) => {
        state.isUserRequestInProgress = false;
      })

      // Refresh
      .addCase(refreshAuthAction.pending, (state) => {
        state.isUserRequestInProgress = true;
        state.userActionType = APIActions.Refresh;
        state.isUserResponseSuccess = false;
        state.userResponseMessage = null;
      })
      .addCase(refreshAuthAction.fulfilled, (state, action) => {
        const isSuccess = action.payload.success;
        const accessToken = isSuccess ? action.payload.payload.accessToken : Symbols.Empty;

        state.isUserRequestInProgress = false;
        state.authorizationStatus = isSuccess ? AuthStatuses.Auth : AuthStatuses.NoAuth;
        state.accessToken = accessToken;
        state.userRole = isSuccess ? getUserRoleByAccessToken(accessToken) : UserRoles.Unknown;
        state.userId = isSuccess ? getUserIdByAccessToken(accessToken) : null;
        state.userActionType = null;
        state.isUserResponseSuccess = isSuccess;
        state.userResponseMessage = action.payload.message;

        switch (isSuccess) {
          case true:
            if (action.payload.payload.refreshToken) {
              setRefreshTokenToStorage(action.payload.payload.refreshToken); 
            }
            break;
        
          case false:
            deleteRefreshTokenFromStorage()
            break;
        }
      })
      .addCase(refreshAuthAction.rejected, (state) => {
        state.isUserRequestInProgress = false;
        state.authorizationStatus = AuthStatuses.NoAuth;
        state.accessToken = Symbols.Empty;
      });
  }
});

export const { resetUserStateAction, setLanguageCodeAction } = userProcess.actions;
