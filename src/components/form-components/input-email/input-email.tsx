import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import InputErrorMessage from '../input-error-message/input-error-message';
import { EMAIL_REGEXP, MAX_EMAIL_LENGTH, Symbols } from '../../../const/common-const';
import { FORM_MESSAGES } from '../../../const/messages-const';
import { UI_NAMES } from '../../../const/ui-const';
import { useAppSelector } from '../../../hooks';
import { getLanguageCode } from '../../../store/processes/user-process/user-selectors';

type InputEmailPropsType = {
  passEmailToParent: Dispatch<SetStateAction<string>>,
  passEmailValidStatusToParent: Dispatch<SetStateAction<boolean>>,
  isFormTriedToSubmit: boolean,
  resetIsFormTriedToSubmit: Dispatch<SetStateAction<boolean>>,
  isDisabled: boolean,
  autofocus?: boolean
}

function InputEmail({
  passEmailToParent,
  passEmailValidStatusToParent,
  isFormTriedToSubmit,
  resetIsFormTriedToSubmit,
  isDisabled,
  autofocus = false
}: InputEmailPropsType) {
  const languageCode = useAppSelector(getLanguageCode);
  
  const [email, setEmail] = useState<string>(Symbols.Empty);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [errorShouldBeShown, setErrorShouldBeShown] = useState<boolean>(false);
  const [errorMessage, setErrorMassage] = useState<string>(Symbols.Empty);
  
  // Functions
  const validateEmail = (email: string) => EMAIL_REGEXP.test(email);

  const getEmailErrorMessage = (email: string) => {
    let errorMessage: string = Symbols.Empty;

    switch (true) {
      case email === Symbols.Empty:
        errorMessage = FORM_MESSAGES.EMAIL_EMPTY[languageCode];
        break;
    
      case !isEmailValid:
        errorMessage = FORM_MESSAGES.EMAIL_INCORRECT[languageCode];
        break;
    }

    return errorMessage;
  };

  const showErrors = () => {
    if (email === Symbols.Empty) return;

    switch (isEmailValid) {
      case true:
        setErrorShouldBeShown(false);
        setErrorMassage(Symbols.Empty);
        break;
    
      case false:
        setErrorShouldBeShown(true);
        setErrorMassage(getEmailErrorMessage(email));
        break;
    }
  };

  // Handlers
  const inputEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (errorShouldBeShown) setErrorShouldBeShown(false);
    if (errorMessage !== Symbols.Empty) setErrorMassage(Symbols.Empty);
    if (isFormTriedToSubmit) resetIsFormTriedToSubmit(false);

    const email = e.target.value;
    const isEmailValid = validateEmail(email);

    setEmail(email);
    setIsEmailValid(isEmailValid);
    passEmailValidStatusToParent(isEmailValid);
  };

  const blurEmailHandler = () => {
    showErrors();
    passEmailToParent(email);
  };

  // Effects
  useEffect(() => {
    if (!errorShouldBeShown) return;

    setErrorMassage(getEmailErrorMessage(email));
  }, [languageCode]);

  useEffect(() => {
    if (!isEmailValid && isFormTriedToSubmit && !errorShouldBeShown) {
      setErrorShouldBeShown(true);
      setErrorMassage(getEmailErrorMessage(email));
    };
  }, [isEmailValid, isFormTriedToSubmit, errorShouldBeShown, email]);

  return (
    <div className="input-email">
      <input 
        className={`input ${errorShouldBeShown ? 'input-wrong' : Symbols.Empty}`}
        type="text"
        name="email"
        placeholder={UI_NAMES.E_MAIL[languageCode]}
        maxLength={MAX_EMAIL_LENGTH}
        autoFocus={autofocus}
        disabled={isDisabled}
        value={email}
        onInput={inputEmailHandler}
        onBlur={blurEmailHandler}
      />

      <InputErrorMessage message={errorMessage} />
    </div>
  );
}

export default InputEmail;
