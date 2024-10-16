import React from 'react';
import Header from '../../components/page-components/header/header';
import Footer from '../../components/page-components/footer/footer';
import Content from '../../components/page-components/content/content';
import { META } from '../../const/meta-const';
import { useAppSelector } from '../../hooks';
import { getLanguageCode } from '../../store/processes/user-process/user-selectors';

function DashboardPage() {
  const languageCode = useAppSelector(getLanguageCode);

  document.title = META.TITLE.DASHBOARD[languageCode];

  return (
    <>
      <Header />
      <Content>
        <div>Dashboard</div>
      </Content>
      <Footer />
    </>
  );
}

export default DashboardPage;
