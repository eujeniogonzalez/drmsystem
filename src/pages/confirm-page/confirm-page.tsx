import React, { useEffect } from 'react';
import Header from '../../components/page-components/header/header';
import Footer from '../../components/page-components/footer/footer';
import Content from '../../components/page-components/content/content';
import Loader from '../../components/page-components/loader/loader';
import Message from '../../components/page-components/message/message';
import { LoaderColors, LoaderSizes } from '../../const/classnames-const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Navigate, useParams } from 'react-router-dom';
import { confirmUserAction } from '../../store/api-actions/user-api-actions';
import { AuthStatuses, MessageTextColors, MessageTextSizes } from '../../const/common-const';
import { APP_START_ROUTE, AppRoutes } from '../../const/router-const';
import { META } from '../../const/meta-const';
import { APIActions } from '../../const/api-const';
import { UI_NAMES } from '../../const/ui-const';

import {
  getAuthorizationStatus,
  getLanguageCode,
  getUserActionType,
  getUserResponseMessage,
  getIsUserResponseSuccess
} from '../../store/processes/user-process/user-selectors';

function ConfirmPage() {
  const languageCode = useAppSelector(getLanguageCode);
  const { confirmId } = useParams();
  const userActionType = useAppSelector(getUserActionType);
  const isUserResponseSuccess = useAppSelector(getIsUserResponseSuccess);
  const userResponseMessage = useAppSelector(getUserResponseMessage);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  document.title = META.TITLE.CONFIRM[languageCode];

  // Functions
  const getLinksList = () => {
    const loginLink = [{route: AppRoutes.Login, anchor: UI_NAMES.ENTER[languageCode]}];
    const mainLink = [{route: AppRoutes.Main, anchor: UI_NAMES.MAIN[languageCode]}];

    return isUserResponseSuccess ? loginLink : mainLink;
  };

  // Effects
  useEffect(() =>{
    if (confirmId && userActionType !== APIActions.Confirm && userActionType !== APIActions.Refresh) {
      dispatch(confirmUserAction({ confirmId }));
    };
  });

  // Renders
  const renderPageContent = () => {
    switch (true) {
      case authStatus === AuthStatuses.Auth:
        return <Navigate to={APP_START_ROUTE} />

      case isUserResponseSuccess && userActionType === APIActions.Confirm:
        if (userResponseMessage) {
          return (
            <Message
              message={userResponseMessage}
              size={MessageTextSizes.Medium}
              color={MessageTextColors.Dark}
              links={getLinksList()}
            />
          );
        }

      default:
        return <Loader size={LoaderSizes.Large} color={LoaderColors.Grey} />;
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

export default ConfirmPage;
