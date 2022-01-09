import React, { SetStateAction, Suspense, useEffect, useState } from 'react';
import Tabs from '../../components/Tabs/Tabs';
import s from './Auth.scss';
import Login from './Login/Login';
import Registration from './Registration/Registration';

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
    <Login />,
    <Registration />
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
      <Suspense fallback={<div> ...loading</div>}>
        {componentByTabs[activeTab]}
      </Suspense>
    </div>
  );
};

export default Auth;
