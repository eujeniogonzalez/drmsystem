import './ui-blocker.scss';
import React from 'react';
import { LoaderColors, LoaderSizes } from '../../../const/classnames-const';
import Loader from '../loader/loader';

function UIBlocker() {

  return (
    <div className='ui-blocker'>
      <Loader size={LoaderSizes.Medium} color={LoaderColors.White} />
    </div>
  );
}

export default UIBlocker;
