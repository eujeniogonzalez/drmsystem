import './new-password-form.scss';
import React, { useEffect, useState } from 'react';
import InputPassword from '../input-password/input-password';
import Button from '../button/button';
import { useParams } from 'react-router-dom';
import { newPasswordUserAction } from '../../../store/api-actions/user-api-actions';
import { UI_NAMES } from '../../../const/ui-const';
import { APIActions } from '../../../const/api-const';
import { resetUserStateAction } from '../../../store/processes/user-process/user-process';
import { ButtonColors, ButtonTypes, ButtonWidths, KeyCodes, Symbols } from '../../../const/common-const';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import {
  getIsUserRequestInProgress,
  getLanguageCode,
  getUserActionType
} from '../../../store/processes/user-process/user-selectors';

function NewPasswordForm() {
  const dispatch = useAppDispatch();
  const { repassId } = useParams();
  const [newPassword, setNewPassword] = useState<string>(Symbols.Empty);
  const [isNewPasswordValid, setIsNewPasswordValid] = useState<boolean>(false);
  const [newRepeatPassword, setNewRepeatPassword] = useState<string>(Symbols.Empty);
  const [isNewRepeatPasswordValid, setIsNewRepeatPasswordValid] = useState<boolean>(false);
  const [isFormTriedToSubmit, setIsFormTriedToSubmit] = useState<boolean>(false);

  const languageCode = useAppSelector(getLanguageCode);
  const isUserRequestInProgress = useAppSelector(getIsUserRequestInProgress);
  const userActionType = useAppSelector(getUserActionType);
  const isFormDisabled = isUserRequestInProgress && userActionType === APIActions.NewPassword;

  // Functions
  const validateNewPasswordForm = () => isNewPasswordValid && isNewRepeatPasswordValid && newPassword === newRepeatPassword;
  
  // Handlers
  const submitNewPasswordFormHandler = () => {
    const isNewPasswordFormValid = validateNewPasswordForm();

    setIsFormTriedToSubmit(true);

    if (!isNewPasswordFormValid) {
      dispatch(resetUserStateAction());
      return;
    }

    if (repassId) {
      dispatch(newPasswordUserAction({ repassId, newPassword, newRepeatPassword }));
    }
  };

  // Effects
  useEffect(() => {
    const keyClickHandler = (e: KeyboardEvent) => {
      if (e.key === KeyCodes.Enter) submitNewPasswordFormHandler();
    };
    
    window.addEventListener('keydown', keyClickHandler);

    return () => {
      window.removeEventListener('keydown', keyClickHandler);
    };
  }, []);

  return (
    <div className="new-password-form-wrapper">
      <div className="new-password-form-content">
        <div className="new-password-form-title">
          {UI_NAMES.NEW_PASSWORD[languageCode]}
        </div>

        <InputPassword
          passPasswordToParent={setNewPassword}
          passPasswordValidStatusToParent={setIsNewPasswordValid}
          isFormTriedToSubmit={isFormTriedToSubmit}
          resetIsFormTriedToSubmit={setIsFormTriedToSubmit}
          placeholder={UI_NAMES.COME_UP_WITH_PASSWORD[languageCode]}
          autofocus={true}
          isDisabled={isFormDisabled}
        />

        <InputPassword
          passPasswordToParent={setNewRepeatPassword}
          passPasswordValidStatusToParent={setIsNewRepeatPasswordValid}
          isFormTriedToSubmit={isFormTriedToSubmit}
          resetIsFormTriedToSubmit={setIsFormTriedToSubmit}
          passwordForMatching={newPassword}
          placeholder={UI_NAMES.REPEAT_PASSWORD[languageCode]}
          isDisabled={isFormDisabled}
        />

        <Button
          onClick={submitNewPasswordFormHandler}
          title={UI_NAMES.CHANGE_PASSWORD[languageCode]}
          isDisabled={isFormDisabled}
          type={ButtonTypes.Submit}
          color={ButtonColors.Main}
          width={ButtonWidths.Full}
        />
      </div>
    </div>
  );
}

export default NewPasswordForm;
