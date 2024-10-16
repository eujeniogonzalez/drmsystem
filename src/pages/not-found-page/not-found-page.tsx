import React from 'react';
import Header from '../../components/page-components/header/header';
import Footer from '../../components/page-components/footer/footer';
import Content from '../../components/page-components/content/content';
import Message from '../../components/page-components/message/message';
import { META } from '../../const/meta-const';
import { MESSAGES } from '../../const/messages-const';
import { useAppSelector } from '../../hooks';
import { getLanguageCode } from '../../store/processes/user-process/user-selectors';
import { MessageTextColors, MessageTextSizes } from '../../const/common-const';

function NotFoundPage() {
  const languageCode = useAppSelector(getLanguageCode);

  document.title = META.TITLE.NOT_FOUND[languageCode];

  return (
    <>
      <Header />
      <Content>
        <Message
          message={MESSAGES.NOT_FOUND_PAGE[languageCode]}
          size={MessageTextSizes.Medium}
          color={MessageTextColors.Dark}
        />
      </Content>
      <Footer />
    </>
  );
}

export default NotFoundPage;