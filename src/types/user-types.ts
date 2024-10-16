import { APIActions } from '../const/api-const';
import { AuthStatuses, UserRoles } from '../const/common-const';
import { LanguageCodes } from '../const/languages-const';

export type UserIdType = number | null;

export type UserProcessType = {
  isUserRequestInProgress: boolean,
  authorizationStatus: AuthStatuses,
  accessToken: string,
  userRole: UserRoles,
  userId: UserIdType,
  languageCode: LanguageCodes,
  userActionType: APIActions | null,
  isUserResponseSuccess: boolean;
  userResponseMessage: string | null;
};

export type RegisterPayloadType = null;

export type RegisterBodyType = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  repeatPassword: string
};

export type LoginPayloadType = {
  accessToken: string,
  refreshToken?: string
};

export type LoginBodyType = {
  email: string,
  password: string
};

export type RefreshPayloadType = {
  accessToken: string,
  refreshToken?: string
};

export type ConfirmPayloadType = null;

export type ConfirmBodyType = { confirmId: string };

export type RepassPayloadType = null;

export type RepassBodyType = { email: string };

export type LogoutPayloadType = null;

export type NewPasswordPayloadType = null;

export type NewPasswordBodyType = {
  repassId: string,
  newPassword: string,
  newRepeatPassword: string
};

export type TokenType = string;
