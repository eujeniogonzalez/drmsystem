import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FIRST_AND_LAST_NAME_REGEXP, MAX_FIRST_NAME_LENGTH, Symbols } from '../../../const/common-const';
import InputErrorMessage from '../input-error-message/input-error-message';
import { FORM_MESSAGES } from '../../../const/messages-const';
import { UI_NAMES } from '../../../const/ui-const';
import { useAppSelector } from '../../../hooks';
import { getLanguageCode } from '../../../store/processes/user-process/user-selectors';

type InputFirstNamePropsType = {
  passFirstNameToParent: Dispatch<SetStateAction<string>>,
  passFirstNameValidStatusToParent: Dispatch<SetStateAction<boolean>>,
  isFormTriedToSubmit: boolean,
  resetIsFormTriedToSubmit: Dispatch<SetStateAction<boolean>>,
  isDisabled: boolean,
  autofocus?: boolean
}

function InputFirstName({
  passFirstNameToParent,
  passFirstNameValidStatusToParent,
  isFormTriedToSubmit,
  resetIsFormTriedToSubmit,
  isDisabled,
  autofocus = false
}: InputFirstNamePropsType) {
  const languageCode = useAppSelector(getLanguageCode);
  
  const [firstName, setFirstName] = useState<string>(Symbols.Empty);
  const [isFirstNameValid, setIsFirstNameValid] = useState<boolean>(false);
  const [errorShouldBeShown, setErrorShouldBeShown] = useState<boolean>(false);
  const [errorMessage, setErrorMassage] = useState<string>(Symbols.Empty);

  // Functions
  const validateFirstName = (firstName: string) => FIRST_AND_LAST_NAME_REGEXP.test(firstName);

  const getFirstNameErrorMessage = (firstName: string) => {
    let errorMessage: string = Symbols.Empty;

    switch (true) {
      case firstName === Symbols.Empty:
        errorMessage = FORM_MESSAGES.FIRST_NAME_EMPTY[languageCode];
        break;
    
      case firstName[0] === Symbols.Dash:
        errorMessage = FORM_MESSAGES.FIRST_NAME_INCORRECT_FIRST_DASH[languageCode];
        break;

      case firstName.slice(-1) === Symbols.Dash:
        errorMessage = FORM_MESSAGES.FIRST_NAME_INCORRECT_LAST_DASH[languageCode];
        break;

      case firstName.includes(Symbols.DoubleDash):
        errorMessage = FORM_MESSAGES.FIRST_NAME_INCORRECT_DOUBLE_DASH[languageCode];
        break;

      case !isFirstNameValid:
        errorMessage = FORM_MESSAGES.FIRST_NAME_INCORRECT[languageCode];
        break;
    }

    return errorMessage;
  };

  const showErrors = () => {
    if (firstName === Symbols.Empty) return;

    switch (isFirstNameValid) {
      case true:
        setErrorShouldBeShown(false);
        setErrorMassage(Symbols.Empty);
        break;
    
      case false:
        setErrorShouldBeShown(true);
        setErrorMassage(getFirstNameErrorMessage(firstName));
        break;
    }
  };

  // Handlers
  const inputFirstNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (errorShouldBeShown) setErrorShouldBeShown(false);
    if (errorMessage !== Symbols.Empty) setErrorMassage(Symbols.Empty);
    if (isFormTriedToSubmit) resetIsFormTriedToSubmit(false);

    const firstName = e.target.value;
    const isFirstNameValid = validateFirstName(firstName);

    setFirstName(firstName);
    setIsFirstNameValid(isFirstNameValid);
    passFirstNameValidStatusToParent(isFirstNameValid);
  };

  const blurFirstNameHandler = () => {
    showErrors();
    passFirstNameToParent(firstName);
  };

  // Effects
  useEffect(() => {
    if (!errorShouldBeShown) return;

    setErrorMassage(getFirstNameErrorMessage(firstName));
  }, [languageCode]);

  if (!isFirstNameValid && isFormTriedToSubmit && !errorShouldBeShown) {
    setErrorShouldBeShown(true);
    setErrorMassage(getFirstNameErrorMessage(firstName));
  };

  return (
    <div className='input-first-name'>
      <input 
        className={`input ${errorShouldBeShown ? 'input-wrong' : Symbols.Empty}`}
        type='text'
        placeholder={UI_NAMES.FIRST_NAME[languageCode]}
        maxLength={MAX_FIRST_NAME_LENGTH}
        autoFocus={autofocus}
        disabled={isDisabled}
        value={firstName}
        onInput={inputFirstNameHandler}
        onBlur={blurFirstNameHandler}
      />

      <InputErrorMessage message={errorMessage} />
    </div>
  );
}

export default InputFirstName;
