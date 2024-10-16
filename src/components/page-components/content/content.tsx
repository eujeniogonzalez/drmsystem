import './content.scss';
import React from 'react';

type ContentPropsType = {
  children: JSX.Element[] | JSX.Element
};

function Content({children}: ContentPropsType) {
  return (
    <main className='page-content'>
      {children}
    </main>
  );
}

export default Content;
