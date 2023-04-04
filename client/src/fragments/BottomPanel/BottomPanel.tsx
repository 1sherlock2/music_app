import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import BrowserIcon from '../../components/Icons/BottomPanel/Browser';
import HomeIcon from '../../components/Icons/BottomPanel/Home';
import SettingsIcon from '../../components/Icons/BottomPanel/Settings';
import { IBottomPanel } from './BottomPanel.interface';
import s from './BottomPanel.scss';
import OnBoarding from '../../components/OnBoard/onBoarding';
import getLocalStorage from '../../utils/getLocalStorage';
import { useTranslation } from 'react-i18next';

const panelChild: IBottomPanel[] = [
  {
    icon: <HomeIcon size="30px" color="#333" />,
    location: '/',
    id: 'home'
  },
  {
    icon: <BrowserIcon size="30px" color="#333" />,
    location: '/browser',
    id: 'browser',
    onboard: {
      content: 'browserBottom'
    }
  },
  {
    icon: <SettingsIcon size="30px" color="#333" />,
    location: '/settings',
    id: 'settings'
  }
];

const BottomPanel: React.FC = () => {
  const { t } = useTranslation();
  const localeStorage = getLocalStorage();

  const handleClick = (id: string) => localeStorage?.setItem(id, 'true');

  return (
    <div className={s.container}>
      {panelChild.map(({ icon, location, reload, id, onboard }, i) =>
        onboard?.content ? (
          <OnBoarding name="playlist" content={t(onboard.content)} panelId={id}>
            <div className={s.container_item}>
              <Link
                to={location}
                id={id}
                className={s.link}
                key={`${location}_${i}`}
                reloadDocument={reload || false}
                onClick={() => handleClick(id)}
              >
                {icon}
              </Link>
            </div>
          </OnBoarding>
        ) : (
          <div className={s.container_item}>
            <Link
              to={location}
              id={id}
              className={s.link}
              key={`${location}_${i}`}
              reloadDocument={reload || false}
              onClick={() => handleClick(id)}
            >
              {icon}
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default BottomPanel;
