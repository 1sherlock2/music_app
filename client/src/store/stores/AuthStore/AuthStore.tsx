import { action, observable } from 'mobx';
import { ILoginData } from './AuthStore.interface';

export default class AuthStore {
  @observable loginData: ILoginData = {
    nickname: null,
    password: null
  };

  @action
  addLoginData(nickname: string, password: string) {
    this.loginData.nickname = nickname;
    this.loginData.password = password;
  }
}
