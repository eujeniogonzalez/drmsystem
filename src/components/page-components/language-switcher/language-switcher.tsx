import './language-switcher.scss';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getLanguageCode } from '../../../store/processes/user-process/user-selectors';
import { LanguageCodes } from '../../../const/languages-const';
import { setLanguageCodeAction } from '../../../store/processes/user-process/user-process';
import { setLanguageCodeToStorage } from '../../../services/local-storage';
import { Symbols } from '../../../const/common-const';
import { LANGUAGE_SWITCHER_CLASSES, LANGUAGE_SWITCHER_IMAGE_CLASSES } from '../../../const/classnames-const';

function LanguageSwitcher() {
  const dispatch = useAppDispatch();
  const languageCode = useAppSelector(getLanguageCode);
  const [leverPosition, setLeverPosition] = useState(LANGUAGE_SWITCHER_CLASSES[languageCode]);

  useEffect(() => {
    setLeverPosition(LANGUAGE_SWITCHER_CLASSES[languageCode]);
  }, [languageCode]);

  const languageSwitcherClickHandler = () => {
    switch (languageCode) {
      case LanguageCodes.English:
        setLanguageCodeToStorage(LanguageCodes.Russian);
        dispatch(setLanguageCodeAction(LanguageCodes.Russian));
        break;

      case LanguageCodes.Russian:
        setLanguageCodeToStorage(LanguageCodes.English);
        dispatch(setLanguageCodeAction(LanguageCodes.English));
        break;
    }
  };

  const leverVisibleRussia = (
    languageCode === LanguageCodes.Russian 
      ? LANGUAGE_SWITCHER_IMAGE_CLASSES[LanguageCodes.Russian] 
      : Symbols.Empty
  );

  const leverVisibleEnglish = (
    languageCode === LanguageCodes.English 
      ? LANGUAGE_SWITCHER_IMAGE_CLASSES[LanguageCodes.English] 
      : Symbols.Empty
  );

  return (
    <div
      className={`language-switcher`}
      onClick={languageSwitcherClickHandler}
    >
      <div className={`switcher-lever ${leverPosition}`}>
        <div className={`switcher-lever-image-russia ${leverVisibleRussia}`}></div>
        <div className={`switcher-lever-image-english ${leverVisibleEnglish}`}></div>
      </div>
    </div>
  );
}

export default LanguageSwitcher;

