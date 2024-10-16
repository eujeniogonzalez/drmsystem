import './message.scss';
import React from 'react';
import LinksBlock from '../links-block/links-block';
import { LinksBlockAlignment, MessageTextColors, MessageTextSizes } from '../../../const/common-const';
import { LinksListType } from '../../../types/links-list-type';

type MessagePropsType = {
  message: JSX.Element | string,
  size: MessageTextSizes,
  color: MessageTextColors,
  links?: LinksListType
};

function Message({ message, size, color, links }: MessagePropsType) {
  const getSizeStyles = (size: MessageTextSizes) => {
    switch (size) {
      case MessageTextSizes.Large:
        return 'message-text-size-large';
      
      case MessageTextSizes.Medium:
        return 'message-text-size-medium';

      case MessageTextSizes.Small:
        return 'message-text-size-small';

      case MessageTextSizes.Micro:
        return 'message-text-size-micro';
    }
  };

  const getColorStyles = (color: MessageTextColors) => {
    switch (color) {
      case MessageTextColors.Dark:
        return 'message-text-color-dark';
      
      case MessageTextColors.Standart:
        return 'message-text-color-standart';

      case MessageTextColors.Light:
        return 'message-text-color-light';
    }
  };

  const showLinks = () => {
    if (!links) return;

    return <LinksBlock links={links} alignment={LinksBlockAlignment.Horizontal} />
  };

  return (
    <div className="message">
      <div className={`message-text ${getSizeStyles(size)} ${getColorStyles(color)}`}>
        {message}
      </div>

      {showLinks()}
    </div>
  );
}

export default Message;
