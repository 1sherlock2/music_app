import React from 'react';
import { useTranslation } from 'react-i18next';
import s from './ChangeLanguage.scss';
import { useSetRecoilState } from 'recoil';
import { changeLang } from './state';
import useClickOutside from '../../../hooks/useClickOutside';
import { getLangName } from './utils';

const ChangeLanguage = () => {
  const { t, i18n } = useTranslation();
  const setLangPopup = useSetRecoilState(changeLang);

  const language = getLangName(i18n.language);
  const handleClick = () => setLangPopup(true);

  return (
    <>
      <div className={s.container} onClick={handleClick}>
        <div>{t('changeLanguage')}</div>
        <div>{language}</div>
      </div>
    </>
  );
};

export default ChangeLanguage;
