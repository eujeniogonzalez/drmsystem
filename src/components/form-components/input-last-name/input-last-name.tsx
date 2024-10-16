import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FIRST_AND_LAST_NAME_REGEXP, MAX_LAST_NAME_LENGTH, Symbols } from '../../../const/common-const';
import InputErrorMessage from '../input-error-message/input-error-message';
import { FORM_MESSAGES } from '../../../const/messages-const';
import { UI_NAMES } from '../../../const/ui-const';
import { useAppSelector } from '../../../hooks';
import { getLanguageCode } from '../../../store/processes/user-process/user-selectors';

type InputLastNamePropsType = {
  passLastNameToParent: Dispatch<SetStateAction<string>>,
  passLastNameValidStatusToParent: Dispatch<SetStateAction<boolean>>,
  isFormTriedToSubmit: boolean,
  resetIsFormTriedToSubmit: Dispatch<SetStateAction<boolean>>,
  isDisabled: boolean,
  autofocus?: boolean
}

function InputLastName({
  passLastNameToParent,
  passLastNameValidStatusToParent,
  isFormTriedToSubmit,
  resetIsFormTriedToSubmit,
  isDisabled,
  autofocus = false
}: InputLastNamePropsType) {
  const languageCode = useAppSelector(getLanguageCode);
  
  const [lastName, setLastName] = useState<string>(Symbols.Empty);
  const [isLastNameValid, setIsLastNameValid] = useState<boolean>(false);
  const [errorShouldBeShown, setErrorShouldBeShown] = useState<boolean>(false);
  const [errorMessage, setErrorMassage] = useState<string>(Symbols.Empty);

  // Functions
  const validateLastName = (lastName: string) => FIRST_AND_LAST_NAME_REGEXP.test(lastName);

  const getLastNameErrorMessage = (lastName: string) => {
    let errorMessage: string = Symbols.Empty;

    switch (true) {
      case lastName === Symbols.Empty:
        errorMessage = FORM_MESSAGES.LAST_NAME_EMPTY[languageCode];
        break;
    
      case lastName[0] === Symbols.Dash:
        errorMessage = FORM_MESSAGES.LAST_NAME_INCORRECT_FIRST_DASH[languageCode];
        break;

      case lastName.slice(-1) === Symbols.Dash:
        errorMessage = FORM_MESSAGES.LAST_NAME_INCORRECT_LAST_DASH[languageCode];
        break;

      case lastName.includes(Symbols.DoubleDash):
        errorMessage = FORM_MESSAGES.LAST_NAME_INCORRECT_DOUBLE_DASH[languageCode];
        break;

      case !isLastNameValid:
        errorMessage = FORM_MESSAGES.LAST_NAME_INCORRECT[languageCode];
        break;
    }

    return errorMessage;
  };

  const showErrors = () => {
    if (lastName === Symbols.Empty) return;

    switch (isLastNameValid) {
      case true:
        setErrorShouldBeShown(false);
        setErrorMassage(Symbols.Empty);
        break;
    
      case false:
        setErrorShouldBeShown(true);
        setErrorMassage(getLastNameErrorMessage(lastName));
        break;
    }
  };

  // Handlers
  const inputFirstNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (errorShouldBeShown) setErrorShouldBeShown(false);
    if (errorMessage !== Symbols.Empty) setErrorMassage(Symbols.Empty);
    if (isFormTriedToSubmit) resetIsFormTriedToSubmit(false);

    const firstName = e.target.value;
    const isFirstNameValid = validateLastName(firstName);

    setLastName(firstName);
    setIsLastNameValid(isFirstNameValid);
    passLastNameValidStatusToParent(isFirstNameValid);
  };

  const blurLastNameHandler = () => {
    showErrors();
    passLastNameToParent(lastName);
  };

  // Effects
  useEffect(() => {
    if (!errorShouldBeShown) return;

    setErrorMassage(getLastNameErrorMessage(lastName));
  }, [languageCode]);
  
  if (!isLastNameValid && isFormTriedToSubmit && !errorShouldBeShown) {
    setErrorShouldBeShown(true);
    setErrorMassage(getLastNameErrorMessage(lastName));
  };

  return (
    <div className='input-last-name'>
      <input 
        className={`input ${errorShouldBeShown ? 'input-wrong' : Symbols.Empty}`}
        type='text'
        placeholder={UI_NAMES.LAST_NAME[languageCode]}
        maxLength={MAX_LAST_NAME_LENGTH}
        autoFocus={autofocus}
        disabled={isDisabled}
        value={lastName}
        onInput={inputFirstNameHandler}
        onBlur={blurLastNameHandler}
      />

      <InputErrorMessage message={errorMessage} />
    </div>
  );
}

export default InputLastName;
