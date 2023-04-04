import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import LogoutIcon from '../../../components/Icons/Logout';
import { isAuthentication } from '../../../store';
import { authLocalStorage } from '../../../utils/localStorage';
import s from './Logout.scss';
import { useTranslation } from 'react-i18next';

const Logout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setIsAuthentication = useSetRecoilState(isAuthentication);
  const logoutHandle = () => {
    authLocalStorage.removeStorage();
    setIsAuthentication(false);
    navigate('/login');
  };

  return (
    <div onClick={logoutHandle} className={s.logout}>
      <div>{t('logout')}</div>
      <LogoutIcon size="24px" />
    </div>
  );
};

export default Logout;
