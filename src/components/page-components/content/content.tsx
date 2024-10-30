import './content.scss';
import React from 'react';
import LeftSidebar from "../left-sidebar/left-sidebar";

type ContentPropsType = {
  children: JSX.Element[] | JSX.Element;
  isPublic?: boolean;
};

function Content({ children, isPublic }: ContentPropsType) {
  const renderPrivateLayout = () => (
    <>
      <LeftSidebar />

      <section className='page-content'>
        {children}
      </section>
    </>
  );

  return (
    <main>
      {isPublic ? children : renderPrivateLayout()}
    </main>
  );
}

export default Content;