import { LanguageCodes } from './languages-const';

export enum NameSpace {
  User = 'user',
  Toast = 'toast',
  Modal = 'modal'
}

export enum AuthStatuses {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum Symbols {
  Empty = '',
  DoubleSlash = '//',
  Underline = '_',
  Dot = '.',
  Space = ' ',
  Dash = '-',
  DoubleDash = '--'
}

export enum LinksBlockAlignment {
  Vertical = 'vertical',
  Horizontal = 'horizontal'
}

export enum UserRoles {
  Unknown = 'unknown',
  Client = 'owner',
  Partner = 'volunteer'
}

export enum MessageTextSizes {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
  Micro = 'micro'
}

export enum MessageTextColors {
  Dark = 'dark',
  Standart = 'standart',
  Light = 'light'
}

export const COMPANY_NAME = {
  [LanguageCodes.Russian]: 'DRM-система',
  [LanguageCodes.English]: 'DRM System'
};

export enum ButtonTypes {
  Submit = 'submit',
  Button = 'button'
}

export enum ButtonColors {
  Main = 'main',
  Grey = 'grey'
}

export enum ButtonWidths {
  Full = 'full',
  Fix = 'fix'
}

export enum KeySymbols {
  Enter = 'Enter',
  ArrowRight = '⟶',
  Escape = 'Esc'
}

export enum KeyCodes {
  Enter = 'Enter',
  ArrowRight = 'ArrowRight',
  Escape = 'Escape'
}

export const EMAIL_REGEXP = /^[a-zA-Z0-9_]+([.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,15}$/;
export const PASSWORD_REGEXP = /^[a-zA-Z0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/;
export const MAX_EMAIL_LENGTH = 129;
export const MAX_PASSWORD_LENGTH = 50;
export const MAX_FIRST_NAME_LENGTH = 30;
export const MAX_LAST_NAME_LENGTH = 30;
export const ANY_CAPITAL_LETTER_REGEXP = /(?=[A-Z])/;
export const SLASHES_AT_END_OF_STRING_REGEXP = /\/+$/;
export const MIN_LOADER_DISPLAYING_TIME = 700;
export const FIRST_AND_LAST_NAME_REGEXP = /^(?!-)(?!.*--)[\p{L}-]+(?<!-)$/u;
