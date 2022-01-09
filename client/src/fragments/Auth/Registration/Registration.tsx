import React, {
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import { Loader_1 } from '../../../loader/Loader_1';
import Input from '../../../components/Input/Input';
import s from './Registration.scss';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  isAuthentication,
  responseRegister,
  setRegistrData
} from '../../../store/index';
import responseMessages from '../../../store/responseMessages';
import { useHistory } from 'react-router-dom';

const Registration: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const registrDatas = useSetRecoilState(setRegistrData);
  const responseData = useRecoilValue(responseRegister);
  const [error, setError] = useState<SetStateAction<boolean | string>>(false);
  const [successMessage, setSuccessMessage] =
    useState<SetStateAction<boolean | string>>(false);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password) {
      setError(responseMessages.fillAllFroms);
      setLoading(false);
      return;
    }
    registrDatas({ nickname: name, email, password });
  };

  useEffect(() => {
    if (responseData) {
      const { success, message } = responseData;
      setLoading(false);
      if (!success) {
        setError(message);
        return;
      }
      setSuccessMessage(
        'Registration success, please switch select Login tab for sign in'
      );
    }
  }, [responseData]);

  return (
    <div className={s.registr}>
      <form onSubmit={handleSubmit} className={s.registr_form}>
        <Input
          value={name}
          onChange={setName}
          placeholder="nickname"
          size="m"
          closeSize
        />
        <Input
          value={email}
          onChange={setEmail}
          placeholder="email"
          size="m"
          validate="email"
          closeSize
        />
        <Input
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="password"
          size="m"
          closeSize
          validate="password"
        />
        <div className={s.handleSubmit}>
          <Input type="submit" value="Registration" size="l" style="pink" />
          {loading && <Loader_1 />}
        </div>
        {error && <div className={s.error}>{error}</div>}
        {successMessage && !error && (
          <div className={s.success}>{successMessage}</div>
        )}
      </form>
    </div>
  );
};

export default Registration;
