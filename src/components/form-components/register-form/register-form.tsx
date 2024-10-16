import './register-form.scss';
import React, { useEffect, useState } from 'react';
import InputEmail from '../input-email/input-email';
import InputPassword from '../input-password/input-password';
import Button from '../button/button';
import LinksBlock from '../../page-components/links-block/links-block';
import InputFirstName from '../input-first-name/input-first-name';
import InputLastName from '../input-last-name/input-last-name';
import { APIActions } from '../../../const/api-const';
import { resetUserStateAction } from '../../../store/processes/user-process/user-process';
import { UI_NAMES } from '../../../const/ui-const';
import { AppRoutes } from '../../../const/router-const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { registerUserAction } from '../../../store/api-actions/user-api-actions';

import {
  ButtonColors,
  ButtonTypes,
  ButtonWidths,
  KeyCodes,
  LinksBlockAlignment,
  Symbols
} from '../../../const/common-const';

import {
  getIsUserRequestInProgress,
  getLanguageCode,
  getUserActionType
} from '../../../store/processes/user-process/user-selectors';

function RegisterForm() {
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState<string>(Symbols.Empty);
  const [isFirstNameValid, setIsFirstNameValid] = useState<boolean>(false);
  const [lastName, setLastName] = useState<string>(Symbols.Empty);
  const [isLastNameValid, setIsLastNameValid] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(Symbols.Empty);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [password, setPassword] = useState<string>(Symbols.Empty);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [repeatPassword, setRepeatPassword] = useState<string>(Symbols.Empty);
  const [isRepeatPasswordValid, setIsRepeatPasswordValid] = useState<boolean>(false);
  const [isFormTriedToSubmit, setIsFormTriedToSubmit] = useState<boolean>(false);

  const languageCode = useAppSelector(getLanguageCode);
  const isUserRequestInProgress = useAppSelector(getIsUserRequestInProgress);
  const userActionType = useAppSelector(getUserActionType);
  const isFormDisabled = isUserRequestInProgress && userActionType === APIActions.Register;

  // Functions
  const validateRegisterForm = () => (
    isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isRepeatPasswordValid && password === repeatPassword
  );

  // Handlers
  const submitRegisterFormHandler = () => {
    const isRegisterFormValid = validateRegisterForm();

    setIsFormTriedToSubmit(true);

    if (!isRegisterFormValid) {
      dispatch(resetUserStateAction());
      return;
    }

    dispatch(registerUserAction({ firstName, lastName, email, password, repeatPassword }));
  };

  // Effects
  useEffect(() => {
    const keyClickHandler = (e: KeyboardEvent) => {
      if (e.key === KeyCodes.Enter) submitRegisterFormHandler();
    };
    
    window.addEventListener('keydown', keyClickHandler);

    return () => {
      window.removeEventListener('keydown', keyClickHandler);
    };
  }, []);

  return (
    <div className="register-form-wrapper">
      <div className="register-form-content">
        <div className="register-form-title">
          {UI_NAMES.REGISTRATION[languageCode]}
        </div>
        
        <InputFirstName
          passFirstNameToParent={setFirstName}
          passFirstNameValidStatusToParent={setIsFirstNameValid}
          isFormTriedToSubmit={isFormTriedToSubmit}
          resetIsFormTriedToSubmit={setIsFormTriedToSubmit}
          isDisabled={isFormDisabled}
          autofocus={true}
        />

        <InputLastName
          passLastNameToParent={setLastName}
          passLastNameValidStatusToParent={setIsLastNameValid}
          isFormTriedToSubmit={isFormTriedToSubmit}
          resetIsFormTriedToSubmit={setIsFormTriedToSubmit}
          isDisabled={isFormDisabled}
        />

        <InputEmail
          passEmailToParent={setEmail}
          passEmailValidStatusToParent={setIsEmailValid}
          isFormTriedToSubmit={isFormTriedToSubmit}
          resetIsFormTriedToSubmit={setIsFormTriedToSubmit}
          isDisabled={isFormDisabled}
        />

        <InputPassword
          passPasswordToParent={setPassword}
          passPasswordValidStatusToParent={setIsPasswordValid}
          isFormTriedToSubmit={isFormTriedToSubmit}
          resetIsFormTriedToSubmit={setIsFormTriedToSubmit}
          placeholder={UI_NAMES.COME_UP_WITH_PASSWORD[languageCode]}
          isDisabled={isFormDisabled}
        />
        
        <InputPassword
          passPasswordToParent={setRepeatPassword}
          passPasswordValidStatusToParent={setIsRepeatPasswordValid}
          isFormTriedToSubmit={isFormTriedToSubmit}
          resetIsFormTriedToSubmit={setIsFormTriedToSubmit}
          passwordForMatching={password}
          placeholder={UI_NAMES.REPEAT_PASSWORD[languageCode]}
          isDisabled={isFormDisabled}
        />

        <Button
          onClick={submitRegisterFormHandler}
          title={UI_NAMES.REGISTER[languageCode]}
          isDisabled={isFormDisabled}
          type={ButtonTypes.Submit}
          color={ButtonColors.Main}
          width={ButtonWidths.Full}
        />

        <LinksBlock
          links={[
            {route: AppRoutes.Login, anchor: UI_NAMES.ENTER[languageCode]},
            {route: AppRoutes.Repass, anchor: UI_NAMES.RESTORE_PASSWORD[languageCode]}
          ]}
          alignment={LinksBlockAlignment.Horizontal}
        />
      </div>
    </div>
  );
}

export default RegisterForm;
