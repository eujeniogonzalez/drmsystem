import './login-form.scss';
import React, { useEffect, useState } from 'react';
import InputEmail from '../input-email/input-email';
import LinksBlock from '../../page-components/links-block/links-block';
import Button from '../button/button';
import InputPassword from '../input-password/input-password';
import { UI_NAMES } from '../../../const/ui-const';
import { AppRoutes } from '../../../const/router-const';
import { APIActions } from '../../../const/api-const';
import { loginUserAction } from '../../../store/api-actions/user-api-actions';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { resetUserStateAction } from '../../../store/processes/user-process/user-process';

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
  getUserActionType,
} from '../../../store/processes/user-process/user-selectors';

function LoginForm() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>(Symbols.Empty);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [password, setPassword] = useState<string>(Symbols.Empty);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isFormTriedToSubmit, setIsFormTriedToSubmit] = useState<boolean>(false);

  const languageCode = useAppSelector(getLanguageCode);
  const isUserRequestInProgress = useAppSelector(getIsUserRequestInProgress);
  const userActionType = useAppSelector(getUserActionType);
  const isFormDisabled = isUserRequestInProgress && userActionType === APIActions.Login;

  // Functions
  const validateLoginForm = () => isEmailValid && isPasswordValid;

  // Handlers
  const submitLoginFormHandler = () => {
    const isLoginFormValid = validateLoginForm();

    setIsFormTriedToSubmit(true);

    if (!isLoginFormValid) {
      dispatch(resetUserStateAction());
      return;
    }

    dispatch(loginUserAction({ email, password }));
  };

  // Effects
  useEffect(() => {
    const keyClickHandler = (e: KeyboardEvent) => {
      if (e.key === KeyCodes.Enter) submitLoginFormHandler();
    };
    
    window.addEventListener('keydown', keyClickHandler);

    return () => {
      window.removeEventListener('keydown', keyClickHandler);
    };
  }, [email, isEmailValid, password, isPasswordValid]);

  return (
    <div className="login-form-wrapper">
      <div className="login-form-content">
        <div className="login-form-title">
          {UI_NAMES.ENTRANCE[languageCode]}
        </div>

        <InputEmail
          passEmailToParent={setEmail}
          passEmailValidStatusToParent={setIsEmailValid}
          isFormTriedToSubmit={isFormTriedToSubmit}
          resetIsFormTriedToSubmit={setIsFormTriedToSubmit}
          isDisabled={isFormDisabled}
          autofocus={true}
        />

        <InputPassword
          passPasswordToParent={setPassword}
          passPasswordValidStatusToParent={setIsPasswordValid}
          isFormTriedToSubmit={isFormTriedToSubmit}
          resetIsFormTriedToSubmit={setIsFormTriedToSubmit}
          isDisabled={isFormDisabled}
          placeholder={UI_NAMES.PASSWORD[languageCode]}
        />

        <Button
          onClick={submitLoginFormHandler}
          title={UI_NAMES.ENTER[languageCode]}
          isDisabled={isFormDisabled}
          type={ButtonTypes.Submit}
          color={ButtonColors.Main}
          width={ButtonWidths.Full}
        />

        <LinksBlock
          links={[
            {route: AppRoutes.Repass, anchor: UI_NAMES.RESTORE_PASSWORD[languageCode]},
            {route: AppRoutes.Register, anchor: UI_NAMES.REGISTRATION[languageCode]}
          ]}
          alignment={LinksBlockAlignment.Horizontal}
        />
      </div>
    </div>
  );
}

export default LoginForm;
