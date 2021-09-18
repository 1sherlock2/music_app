import React, { SetStateAction, Suspense, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { loginText } from '../../store';
import Tabs from '../../components/Tabs/Tabs';
import s from './Auth.scss';
import Login from './Login/Login';

const Auth: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState<SetStateAction<null | string[]>>(null);
  const changeActibeTab = (index: number) => {
    setActiveTab(index);
  };

  useEffect(() => {
    setTabs(['Login', 'Registration']);
  }, []);

  const componentByTabs: React.ReactElement<{}>[] = [
    <Suspense fallback={<div> loading</div>}>
      <Login />
    </Suspense>
  ].filter(Boolean);

  return (
    <div className={s.authModal}>
      <div className={s.authModal_container}>
        <Tabs
          tabs={tabs}
          onClick={changeActibeTab}
          active={activeTab}
          size="l"
          color="pink"
        />
      </div>
      {componentByTabs[activeTab]}
    </div>
  );
};

export default Auth;
