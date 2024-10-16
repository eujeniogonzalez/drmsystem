import './confirmation.scss';
import React, { useEffect } from 'react';
import Button from '../../form-components/button/button';
import { MESSAGES } from '../../../const/messages-const';
import { UI_NAMES } from '../../../const/ui-const';
import { useAppSelector } from '../../../hooks';
import { getLanguageCode } from '../../../store/processes/user-process/user-selectors';
import { ButtonColors, ButtonTypes, ButtonWidths, KeyCodes, KeySymbols } from '../../../const/common-const';

type ConfirmationPropsType = {
  message: string,
  onConfirm: () => void,
  onCancel: () => void
};

function Confirmation({ message, onConfirm, onCancel }: ConfirmationPropsType) {
  const languageCode = useAppSelector(getLanguageCode);
  
  // Handlers
  const cancelButtonClickHandler = () => onCancel();

  const confirmButtonClickHandler = () => onConfirm();

  // Effects
  useEffect(() => {
    const keyClickHandler = (e: KeyboardEvent) => {
      if (e.key === KeyCodes.Enter) confirmButtonClickHandler();
    };
    
    window.addEventListener('keydown', keyClickHandler);

    return () => {
      window.removeEventListener('keydown', keyClickHandler);
    };
  }, [onConfirm]);

  return (
    <div className="confirmation">
      <div className="confirmation-message">{message}</div>

      <div className="confirmation-question">{MESSAGES.CONTINUE_QUESTION[languageCode]}</div>

      <div className="confirmation-buttons">
        <Button
          onClick={cancelButtonClickHandler}
          title={UI_NAMES.NO[languageCode]}
          keyTitle={KeySymbols.Escape}
          type={ButtonTypes.Button}
          color={ButtonColors.Grey}
          width={ButtonWidths.Fix}
        />

        <Button
          onClick={confirmButtonClickHandler}
          title={UI_NAMES.YES[languageCode]}
          keyTitle={KeySymbols.Enter}
          type={ButtonTypes.Button}
          color={ButtonColors.Grey}
          width={ButtonWidths.Fix}
        />
      </div>
    </div>
  );
}

export default Confirmation;
