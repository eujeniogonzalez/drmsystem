import React, { KeyboardEvent, ChangeEvent, useState, Dispatch, SetStateAction, useEffect } from 'react';
import InputErrorMessage from '../input-error-message/input-error-message';
import { FORM_MESSAGES } from '../../../const/messages-const';
import { useAppSelector } from '../../../hooks';
import { getLanguageCode } from '../../../store/processes/user-process/user-selectors';
import { KeyCodes, MAX_PASSWORD_LENGTH, PASSWORD_REGEXP, Symbols } from '../../../const/common-const';

type InputPasswordPropsType = {
  passPasswordToParent: Dispatch<SetStateAction<string>>,
  passPasswordValidStatusToParent: Dispatch<SetStateAction<boolean>>,
  isFormTriedToSubmit: boolean,
  autofocus?: boolean,
  resetIsFormTriedToSubmit: Dispatch<SetStateAction<boolean>>,
  passwordForMatching?: string,
  placeholder?: string,
  isDisabled: boolean
}

function InputPassword({
  passPasswordToParent,
  passPasswordValidStatusToParent,
  isFormTriedToSubmit,
  resetIsFormTriedToSubmit,
  passwordForMatching,
  placeholder,
  autofocus = false,
  isDisabled
}: InputPasswordPropsType) {
  const languageCode = useAppSelector(getLanguageCode);
  
  const [password, setPassword] = useState<string>(Symbols.Empty);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [errorShouldBeShown, setErrorShouldBeShown] = useState<boolean>(false);
  const [errorMessage, setErrorMassage] = useState<string>(Symbols.Empty);

  // Functions
  const validatePassword = (password: string) => PASSWORD_REGEXP.test(password);

  const getPasswordErrorMessage = (password: string) => {
    let errorMessage: string = Symbols.Empty;

    switch (true) {
      case password === Symbols.Empty:
        errorMessage = FORM_MESSAGES.PASSWORD_EMPTY[languageCode];
        break;
    
      case (passwordForMatching && passwordForMatching !== password):
        errorMessage = FORM_MESSAGES.PASSWORDS_NOT_MATCH[languageCode];
        break;

      case !isPasswordValid:
        errorMessage = FORM_MESSAGES.PASSWORD_INCORRECT[languageCode];
        break;
    }

    return errorMessage;
  };

  const showErrors = () => {
    if (password === Symbols.Empty) return;

    switch (true) {
      case !isPasswordValid:
        setErrorShouldBeShown(true);
        setErrorMassage(getPasswordErrorMessage(password));
        break;
        
      case (passwordForMatching && passwordForMatching !== password):
        setErrorShouldBeShown(true);
        setErrorMassage(getPasswordErrorMessage(password));
        break;

      case isPasswordValid:
        setErrorShouldBeShown(false);
        setErrorMassage(Symbols.Empty);
        break;
    }
  };

  // Handlers
  const inputPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (errorShouldBeShown) setErrorShouldBeShown(false);
    if (errorMessage !== Symbols.Empty) setErrorMassage(Symbols.Empty);
    if (isFormTriedToSubmit) resetIsFormTriedToSubmit(false);

    const password = e.target.value;
    const isPasswordValid = validatePassword(password);

    setPassword(password);
    setIsPasswordValid(isPasswordValid);
    passPasswordValidStatusToParent(isPasswordValid);
  };

  const blurPasswordHandler = () => {
    showErrors();
    passPasswordToParent(password);
  };

  const keyDownPasswordHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== KeyCodes.Enter) return;

    showErrors();
    passPasswordToParent(password);
  };

  // Effects
  useEffect(() => {
    if (!errorShouldBeShown) return;

    setErrorMassage(getPasswordErrorMessage(password));
  }, [languageCode]);
  
  if (!isPasswordValid && isFormTriedToSubmit && !errorShouldBeShown) {
    setErrorShouldBeShown(true);
    setErrorMassage(getPasswordErrorMessage(password));
  };

  return (
    <div className='input-password'>
      <input
        className={`input ${errorShouldBeShown ? 'input-wrong' : Symbols.Empty}`}
        type='password'
        placeholder={placeholder}
        autoComplete='off'
        autoFocus={autofocus}
        disabled={isDisabled}
        maxLength={MAX_PASSWORD_LENGTH}
        value={password}
        onInput={inputPasswordHandler}
        onBlur={blurPasswordHandler}
        onKeyDown={keyDownPasswordHandler}
      />

      <InputErrorMessage message={errorMessage} />
    </div>
  );
}

export default InputPassword;
