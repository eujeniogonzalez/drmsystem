import './button.scss';
import React from 'react';
import Loader from '../../page-components/loader/loader';
import { LoaderColors, LoaderSizes } from '../../../const/classnames-const';
import { ButtonColors, ButtonTypes, ButtonWidths, KeySymbols, Symbols } from '../../../const/common-const';

type ButtonPropsType = {
  onClick: () => void,
  isDisabled?: boolean,
  type: ButtonTypes,
  color: ButtonColors,
  width: ButtonWidths,
  title: string,
  keyTitle?: KeySymbols
};

function Button({
  onClick,
  isDisabled,
  type,
  color,
  width,
  title,
  keyTitle
}: ButtonPropsType) {

  // Functions
  const getButtonStyles = () => {
    let colorStyles;
    let widthStyles;

    switch (color) {
      case ButtonColors.Main:
        colorStyles = 'button-main-color';
        break;
    
      case ButtonColors.Grey:
        colorStyles = 'button-grey-color';
        break;
    }

    switch (width) {
      case ButtonWidths.Full:
        widthStyles = 'button-full-width';
        break;
    
      case ButtonWidths.Fix:
        widthStyles = 'button-fix-width';
        break;
    }

    return [colorStyles, widthStyles].join(Symbols.Space);
  };

  const getLoaderColor = () => {
    switch (color) {
      case ButtonColors.Main:
        return LoaderColors.White;
    
      case ButtonColors.Grey:
        return LoaderColors.Grey;
    }
  };

  // Handlers
  const buttonClickHandler = onClick;

  // Renders
  const renderButtonTitle = () => {
    return (
      <>
        <div className={keyTitle ? 'button-title-with-key' : 'button-title-single'}>
          {title}
        </div>

        {keyTitle && <div className="button-key">
          {keyTitle}
        </div>}
      </>
    );
  };

  const renderLoader = () => <Loader color={getLoaderColor()} size={LoaderSizes.Micro} />;

  return (
    <button
      className={`button ${getButtonStyles()}`}
      type={type}
      disabled={isDisabled || false}
      onClick={buttonClickHandler}
    >
      {isDisabled ? renderLoader() : renderButtonTitle()}
    </button>
  );
}

export default Button;
