import React from 'react';
import { Link } from 'react-router-dom';
import BrowserIcon from '../../components/Icons/BottomPanel/Browser';
import HomeIcon from '../../components/Icons/BottomPanel/Home';
import SettingsIcon from '../../components/Icons/BottomPanel/Settings';
import { IBottomPanel } from './BottomPanel.interface';
import s from './BottomPanel.scss';

const panelChild: IBottomPanel[] = [
  {
    icon: <HomeIcon size="30px" color="#333" />,
    location: '/'
  },
  {
    icon: <BrowserIcon size="30px" color="#333" />,
    location: '/browser'
  },
  {
    icon: <SettingsIcon size="30px" color="#333" />,
    location: '/'
  }
];
const BottomPanel: React.FC = () => {
  return (
    <div className={s.container}>
      {panelChild.map(({ icon, location }, i) => (
        <Link
          to={location}
          className={s.container_item}
          key={`${location}_${i}`}
          reloadDocument
        >
          {icon}
        </Link>
      ))}
    </div>
  );
};

export default BottomPanel;
