import React, { useEffect } from 'react';
import Header from '../../components/page-components/header/header';
import Footer from '../../components/page-components/footer/footer';
import Content from '../../components/page-components/content/content';
import Message from '../../components/page-components/message/message';
import NewPasswordForm from '../../components/form-components/new-password-form/new-password-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthStatuses, MessageTextColors, MessageTextSizes } from '../../const/common-const';
import { Navigate } from 'react-router-dom';
import { APP_START_ROUTE, AppRoutes } from '../../const/router-const';
import { META } from '../../const/meta-const';
import { APIActions } from '../../const/api-const';
import { resetUserStateAction } from '../../store/processes/user-process/user-process';
import { UI_NAMES } from '../../const/ui-const';

import {
  getAuthorizationStatus,
  getLanguageCode,
  getUserActionType,
  getUserResponseMessage,
  getIsUserResponseSuccess
} from '../../store/processes/user-process/user-selectors';

function NewPasswordPage() {
  const dispatch = useAppDispatch();
  const languageCode = useAppSelector(getLanguageCode);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const userActionType = useAppSelector(getUserActionType);
  const isUserResponseSuccess = useAppSelector(getIsUserResponseSuccess);
  const userResponseMessage = useAppSelector(getUserResponseMessage);

  document.title = META.TITLE.NEW_PASSWORD[languageCode];
  
  // Functions
  const checkNewPasswordSuccess = () => isUserResponseSuccess && userActionType === APIActions.NewPassword;

  // Effects
  useEffect(() =>{
    if (userActionType && userActionType !== APIActions.NewPassword) dispatch(resetUserStateAction());
  });

  // Renders
  const renderPageContent = () => {
    const isNewPasswordSuccess = checkNewPasswordSuccess();

    switch (true) {
      case authStatus === AuthStatuses.Auth:
        return <Navigate to={APP_START_ROUTE} />

      case isNewPasswordSuccess:
        if (userResponseMessage) {
          return (
            <Message
              message={userResponseMessage}
              size={MessageTextSizes.Medium}
              color={MessageTextColors.Dark}
              links={[
                {route: AppRoutes.Login, anchor: UI_NAMES.ENTER[languageCode]}
              ]}
            />
          );
        }

      default:
        return <NewPasswordForm />;
    }
  };

  return (
    <>
      <Header />
      <Content isPublic>
        {renderPageContent()}
      </Content>
      <Footer />
    </>
  );
}

export default NewPasswordPage;
