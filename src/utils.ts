import { adaptFromServerToClient } from './services/adapter';
import { TokenType, UserIdType } from './types/user-types';
import { StartApiTimeType } from './types/api-types';

import {
  ANY_CAPITAL_LETTER_REGEXP,
  MIN_LOADER_DISPLAYING_TIME,
  SLASHES_AT_END_OF_STRING_REGEXP,
  Symbols,
  UserRoles
} from './const/common-const';

import {
  API_URL_DEV,
  API_URL_PROD,
  CLIENT_URL_LOCALHOST,
  CLIENT_URL_PROD
} from './const/api-const'

export function removeLastSlash(string: string) {
  return string.replace(SLASHES_AT_END_OF_STRING_REGEXP, Symbols.Empty);
}

export function getCurrentClientDomain() {
  return [
    window.location.protocol,
    Symbols.DoubleSlash,
    removeLastSlash(window.location.host)
  ].join(Symbols.Empty);
}

export function isClientDomainProd() {
  const currentURL = getCurrentClientDomain();

  return currentURL === CLIENT_URL_PROD;
}

export function isClientDomainLocalhost() {
  const currentURL = getCurrentClientDomain();

  return currentURL === CLIENT_URL_LOCALHOST;
}

export function getAPIURL() {
  return isClientDomainProd() ? API_URL_PROD : API_URL_DEV;
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function uncapitalizeFirstLetter(string: string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

export function convertFromSnakeToCamelCase(text: string) {
  const splittedString = text.split(Symbols.Underline);

  splittedString.forEach((word, i) => {
    if (i === 0) return;

    splittedString[i] = capitalizeFirstLetter(word);
  });

  return splittedString.join(Symbols.Empty);
}

export function convertFromCamelToSnakeCase(text: string) {
  let splittedString = text.split(ANY_CAPITAL_LETTER_REGEXP);

  splittedString = joinSplittedAbbreviation(splittedString);

  splittedString.forEach((word, i) => {
    splittedString[i] = word.length > 1 && isAbbreviation(word) ? word : uncapitalizeFirstLetter(word);
  });

  return splittedString.join(Symbols.Underline);
}

function joinSplittedAbbreviation(arr: string[]) {
  const newArr: string[] = [];
  let skipIndex: number;

  arr.forEach((key, i) => {
    if (i === skipIndex) return;

    if (key.length === 1 && arr[i + 1] && arr[i + 1].length === 1) {
      skipIndex = i + 1;

      newArr.push(key + arr[i + 1]);
    } else {
      newArr.push(key);
    }
  });

  return newArr;
}

export function isUpperCase(str: string) {
  return str !== str.toLowerCase() && str === str.toUpperCase();
}

export function getUserRoleByAccessToken(accessToken: TokenType): UserRoles {
  const tokenPayload = adaptFromServerToClient(JSON.parse(atob(accessToken.split(Symbols.Dot)[1])));
  
  return tokenPayload.role;
};

export function getUserIdByAccessToken(accessToken: TokenType): UserIdType {
  const tokenPayload = adaptFromServerToClient(JSON.parse(atob(accessToken.split(Symbols.Dot)[1])));
  
  return tokenPayload.userId;
};

export function getAccessTokenExpireDate(accessToken: TokenType): number {
  return JSON.parse(atob(accessToken.split(Symbols.Dot)[1])).exp;
};

export function getTimestampWithoutMilliseconds(): number {
  return Math.floor(Date.now() / 1000);
}

export function isAccessTokenExpired(accessToken: TokenType): boolean {
  return getAccessTokenExpireDate(accessToken) < getTimestampWithoutMilliseconds();
}

export function isObject(object: any) {
  return object && !Array.isArray(object) && typeof object === 'object';
}

export function isArray(array: any) {
  return Array.isArray(array);
}

export function isAbbreviation(string: string) {
  return string === string.toUpperCase() && string !== string.toLowerCase();
}

export function syntheticAPIDelay(startTime: StartApiTimeType){
  if (!startTime) return;

  const endTime = new Date().getTime();
  const duration = endTime - startTime;
  const delay = MIN_LOADER_DISPLAYING_TIME - duration;

  if (delay <= 0) return;
  
  return new Promise(resolve => setTimeout(() => resolve('result'), delay));
}

export function getEnumKeyByValue<T>(enumValue: string | null, MyEnum: T): keyof T | null {
  for (const key in MyEnum) {
    if (MyEnum[key as keyof T] === enumValue) {
      return key as keyof T;
    }
  }

  return null;
}
