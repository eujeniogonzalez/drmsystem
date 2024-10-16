import './repass-form.scss';
import React, { useEffect, useState } from 'react';
import LinksBlock from '../../page-components/links-block/links-block';
import InputEmail from '../input-email/input-email';
import Button from '../button/button';
import { AppRoutes } from '../../../const/router-const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { repassUserAction } from '../../../store/api-actions/user-api-actions';
import { UI_NAMES } from '../../../const/ui-const';
import { APIActions } from '../../../const/api-const';
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
  getUserActionType
} from '../../../store/processes/user-process/user-selectors';

function RepassForm() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>(Symbols.Empty);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isFormTriedToSubmit, setIsFormTriedToSubmit] = useState<boolean>(false);

  const languageCode = useAppSelector(getLanguageCode);
  const isUserRequestInProgress = useAppSelector(getIsUserRequestInProgress);
  const userActionType = useAppSelector(getUserActionType);
  const isFormDisabled = isUserRequestInProgress && userActionType === APIActions.Repass;
  
  // Handlers
  const submitRepassFormHandler = () => {
    setIsFormTriedToSubmit(true);

    if (!isEmailValid) {
      dispatch(resetUserStateAction());
      return;
    }

    dispatch(repassUserAction({ email }));
  };
  
  // Effects
  useEffect(() => {
    const keyClickHandler = (e: KeyboardEvent) => {
      if (e.key === KeyCodes.Enter) submitRepassFormHandler();
    };
    
    window.addEventListener('keydown', keyClickHandler);

    return () => {
      window.removeEventListener('keydown', keyClickHandler);
    };
  }, []);

  return (
    <div className="repass-form-wrapper">
      <div className="repass-form-content">
        <div className="repass-form-title">
          {UI_NAMES.RESTORE_PASSWORD[languageCode]}
        </div>

        <InputEmail
          passEmailToParent={setEmail}
          passEmailValidStatusToParent={setIsEmailValid}
          isFormTriedToSubmit={isFormTriedToSubmit}
          resetIsFormTriedToSubmit={setIsFormTriedToSubmit}
          isDisabled={isFormDisabled}
          autofocus={true}
        />

        <Button
          onClick={submitRepassFormHandler}
          title={UI_NAMES.RESTORE[languageCode]}
          isDisabled={isFormDisabled}
          type={ButtonTypes.Submit}
          color={ButtonColors.Main}
          width={ButtonWidths.Full}
        />
        
        <LinksBlock
          links={[
            {route: AppRoutes.Login, anchor: UI_NAMES.ENTER[languageCode]},
            {route: AppRoutes.Register, anchor: UI_NAMES.REGISTRATION[languageCode]}
          ]}
          alignment={LinksBlockAlignment.Horizontal}
        />
      </div>
    </div>
  );
}

export default RepassForm;
