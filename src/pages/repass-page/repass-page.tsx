import React, { useEffect } from 'react';
import Header from '../../components/page-components/header/header';
import Footer from '../../components/page-components/footer/footer';
import Content from '../../components/page-components/content/content';
import RepassForm from '../../components/form-components/repass-form/repass-form';
import Message from '../../components/page-components/message/message';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthStatuses, MessageTextColors, MessageTextSizes } from '../../const/common-const';
import { Navigate } from 'react-router-dom';
import { APP_START_ROUTE } from '../../const/router-const';
import { META } from '../../const/meta-const';
import { APIActions } from '../../const/api-const';
import { resetUserStateAction } from '../../store/processes/user-process/user-process';

import {
  getAuthorizationStatus,
  getLanguageCode,
  getUserActionType,
  getUserResponseMessage,
  getIsUserResponseSuccess
} from '../../store/processes/user-process/user-selectors';

function RepassPage() {
  const dispatch = useAppDispatch();
  const languageCode = useAppSelector(getLanguageCode);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const userActionType = useAppSelector(getUserActionType);
  const isUserResponseSuccess = useAppSelector(getIsUserResponseSuccess);
  const userResponseMessage = useAppSelector(getUserResponseMessage);
  
  document.title = META.TITLE.REPASS[languageCode];

  // Functions
  const checkRepassSuccess = () => isUserResponseSuccess && userActionType === APIActions.Repass;

  // Effects
  useEffect(() =>{
    if (userActionType && userActionType !== APIActions.Repass) dispatch(resetUserStateAction());
  });

  // Renders
  const renderPageContent = () => {
    const isRepassSuccess = checkRepassSuccess();

    switch (true) {
      case authStatus === AuthStatuses.Auth:
        return <Navigate to={APP_START_ROUTE} />;

      case isRepassSuccess:
        if (userResponseMessage) {
          return (
            <Message
              message={userResponseMessage}
              size={MessageTextSizes.Medium}
              color={MessageTextColors.Dark}
            />
          );
        }

      default:
        return <RepassForm />;
    }
  };

  return (
    <>
      <Header />
      <Content>
        {renderPageContent()}
      </Content>
      <Footer />
    </>
  );
}

export default RepassPage;
