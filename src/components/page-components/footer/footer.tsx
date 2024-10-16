import './footer.scss';
import React from 'react';
import { COMPANY_NAME } from '../../../const/common-const';
import { useAppSelector } from '../../../hooks';
import { getLanguageCode } from '../../../store/processes/user-process/user-selectors';

function Footer() {
  const languageCode = useAppSelector(getLanguageCode);
  
  return (
    <footer>
      <div className='footer-limiter'>
        <div className='footer-logo'>{COMPANY_NAME[languageCode]}</div>
      </div>
    </footer>
  );
}

export default Footer;
