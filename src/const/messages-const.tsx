import { LanguageCodes } from './languages-const';

export const MESSAGES = {
  NOT_FOUND_PAGE: {
    [LanguageCodes.Russian]: 'Такой страницы не существует',
    [LanguageCodes.English]: 'Page not found'
  },
  CONTINUE_QUESTION: {
    [LanguageCodes.Russian]: 'Продолжить?',
    [LanguageCodes.English]: 'Continue?'
  }
};

export const FORM_MESSAGES = {
  EMAIL_INCORRECT: {
    [LanguageCodes.Russian]: 'Введён некорректный email',
    [LanguageCodes.English]: 'Email is not correct'
  },
  EMAIL_EMPTY: {
    [LanguageCodes.Russian]: 'Email не может быть пустым',
    [LanguageCodes.English]: 'Email is empty'
  },
  PASSWORD_INCORRECT: {
    [LanguageCodes.Russian]: 'Только латинские буквы, цифры и символы',
    [LanguageCodes.English]: 'Only latin letters, numbers and symbols'
  },
  PASSWORD_EMPTY: {
    [LanguageCodes.Russian]: 'Пароль не может быть пустым',
    [LanguageCodes.English]: 'Password is empty'
  },
  PASSWORDS_NOT_MATCH: {
    [LanguageCodes.Russian]: 'Пароли не совпадают',
    [LanguageCodes.English]: 'Passwords doesn\'t match'
  },
  TEXTAREA_EMPTY: {
    [LanguageCodes.Russian]: 'Поле не может быть пустым',
    [LanguageCodes.English]: 'Field can\'t to be empty'
  },
  FIRST_NAME_INCORRECT: {
    [LanguageCodes.Russian]: 'Только буквы и дефисы',
    [LanguageCodes.English]: 'Only letters and dashes'
  },
  FIRST_NAME_EMPTY: {
    [LanguageCodes.Russian]: 'Имя не может быть пустым',
    [LanguageCodes.English]: 'First name is empty'
  },
  FIRST_NAME_INCORRECT_FIRST_DASH: {
    [LanguageCodes.Russian]: 'Имя не может начинаться с дефиса',
    [LanguageCodes.English]: 'First name can\'t start with dash'
  },
  FIRST_NAME_INCORRECT_LAST_DASH: {
    [LanguageCodes.Russian]: 'Имя не может оканчиваться дефисом',
    [LanguageCodes.English]: 'First name can\'t end with dash'
  },
  FIRST_NAME_INCORRECT_DOUBLE_DASH: {
    [LanguageCodes.Russian]: 'Имя не может содержать два дефиса подряд',
    [LanguageCodes.English]: 'First name can\'t include two dashes together'
  },
  LAST_NAME_INCORRECT: {
    [LanguageCodes.Russian]: 'Только буквы и дефисы',
    [LanguageCodes.English]: 'Only letters and dashes'
  },
  LAST_NAME_EMPTY: {
    [LanguageCodes.Russian]: 'Фамилия не может быть пустой',
    [LanguageCodes.English]: 'Last name is empty'
  },
  LAST_NAME_INCORRECT_FIRST_DASH: {
    [LanguageCodes.Russian]: 'Фамилия не может начинаться с дефиса',
    [LanguageCodes.English]: 'Last name can\'t start with dash'
  },
  LAST_NAME_INCORRECT_LAST_DASH: {
    [LanguageCodes.Russian]: 'Фамилия не может оканчиваться дефисом',
    [LanguageCodes.English]: 'Last name can\'t end with dash'
  },
  LAST_NAME_INCORRECT_DOUBLE_DASH: {
    [LanguageCodes.Russian]: 'Фамилия не может содержать два дефиса подряд',
    [LanguageCodes.English]: 'Last name can\'t include two dashes together'
  }
};

