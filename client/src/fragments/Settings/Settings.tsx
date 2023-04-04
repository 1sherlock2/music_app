import React from 'react';
import BottomPanel from '../BottomPanel/BottomPanel';
import Logout from './Logout/Logout';
import s from './Settings.scss';
import ChangeLanguage from './ChangeLanguage/ChangeLanguage';
import { useRecoilState, useRecoilValue } from 'recoil';
import { changeLang } from './ChangeLanguage/state';
import useClickOutside from '../../hooks/useClickOutside';
import { getLangName, langs } from './ChangeLanguage/utils';
import { useTranslation } from 'react-i18next';
import Button from '../../components/Button/Button';

const Settings = () => {
  const { i18n } = useTranslation();

  const [langPopup, setLangPopup] = useRecoilState(changeLang);
  const containerRef = useClickOutside(() => setLangPopup(false));
  const handleChangeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    setLangPopup(false);
  };
  return (
    <>
      {langPopup && (
        <div className={s.langPopup}>
          <div className={s.langPopup_container} ref={containerRef}>
            {langs.map((lang, i) => {
              console.log({ lang });
              const langName = getLangName(lang);
              const modifyLangName = langName
                ? langName[0].toUpperCase() + langName.slice(1)
                : '';
              return (
                <Button
                  type="submit"
                  color="white"
                  size="m"
                  className={s.button}
                  key={`${lang}_${i}`}
                  disabled={lang === i18n.resolvedLanguage}
                  onClick={() => handleChangeLang(lang)}
                >
                  {modifyLangName}
                </Button>
              );
            })}
          </div>
        </div>
      )}
      <div className={s.container}>
        <Logout />
        <ChangeLanguage />
      </div>
      <BottomPanel />
    </>
  );
};
export default Settings;
