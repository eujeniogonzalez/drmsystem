import { LANGUAGE_CODE_NAME, REFRESH_TOKEN_NAME } from '../const/local-storage-const';
import { LanguageCodes } from '../const/languages-const';

export function setRefreshTokenToStorage(refreshToken: string) {
  localStorage.setItem(REFRESH_TOKEN_NAME, refreshToken);
}

export function getRefreshTokenFromStorage() {
  return localStorage.getItem(REFRESH_TOKEN_NAME);
}

export function checkRefreshTokenSetInStorage() {
  return getRefreshTokenFromStorage() ? true : false;
}

export function deleteRefreshTokenFromStorage() {
  localStorage.removeItem(REFRESH_TOKEN_NAME);
}

export function setLanguageCodeToStorage(languageCode: LanguageCodes) {
  localStorage.setItem(LANGUAGE_CODE_NAME, languageCode);
}

export function getLanguageCodeFromStorage() {
  return localStorage.getItem(LANGUAGE_CODE_NAME);
}
