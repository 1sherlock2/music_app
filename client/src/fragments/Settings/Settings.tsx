import React from 'react';
import BottomPanel from '../BottomPanel/BottomPanel';
import Logout from './Logout/Logout';
import s from './Settings.scss';
const Settings = () => {
  return (
    <>
      <div className={s.container}>
        <Logout />
      </div>
      <BottomPanel />
    </>
  );
};
export default Settings;
