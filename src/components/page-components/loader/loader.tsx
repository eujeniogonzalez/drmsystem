import { LoaderColors, LoaderSizes } from '../../../const/classnames-const';
import './loader.scss';
import React from 'react';

type LoaderPropsType = {
  size: LoaderSizes,
  color: LoaderColors
};

function Loader({ size, color }: LoaderPropsType) {
  return (
    <div className='loader'>
      <div className={`${size} ${color}`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
