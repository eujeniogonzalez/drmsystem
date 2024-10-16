import { APIActions } from '../../../const/api-const';
import { AuthStatuses, NameSpace, UserRoles } from '../../../const/common-const';
import { LanguageCodes } from '../../../const/languages-const';
import { StateType } from '../../../types/state-types';
import { TokenType, UserIdType } from '../../../types/user-types';

export const getAccessToken = (state: StateType): TokenType => (
  state[NameSpace.User].accessToken
);

export const getAuthorizationStatus = (state: StateType): AuthStatuses => (
  state[NameSpace.User].authorizationStatus
);

export const getIsUserRequestInProgress = (state: StateType): boolean => (
  state[NameSpace.User].isUserRequestInProgress
);

export const getUserActionType = (state: StateType): APIActions | null => (
  state[NameSpace.User].userActionType
);

export const getIsUserResponseSuccess = (state: StateType): boolean => (
  state[NameSpace.User].isUserResponseSuccess
);

export const getUserResponseMessage = (state: StateType): string | null => (
  state[NameSpace.User].userResponseMessage
);

export const getUserRole = (state: StateType): UserRoles => (
  state[NameSpace.User].userRole
);

export const getUserId = (state: StateType): UserIdType => (
  state[NameSpace.User].userId
);

export const getLanguageCode = (state: StateType): LanguageCodes => (
  state[NameSpace.User].languageCode
);


