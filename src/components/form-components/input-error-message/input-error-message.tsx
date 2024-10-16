import './input-error-message.scss';
import React from 'react';

type InputErrorMessagePropsType = {
  message: string
};

function InputErrorMessage({ message }: InputErrorMessagePropsType) {
  return (
    <div className='input-error-message'>{message}</div>
  );
}

export default InputErrorMessage;