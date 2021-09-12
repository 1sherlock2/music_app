import {
  IErrorInput,
  IErrorStatus,
  IValidationInput,
  IValidationIptions
} from '../Input.interface';

export const validateOptions: IValidationIptions = {
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  password: {
    length: 4
  }
};

export const errorStatus = (
  status: boolean,
  message: string
): IErrorStatus => ({ status, message });

export const emailValidation = ({
  value,
  type
}: IValidationInput): IErrorInput => {
  const { email } = validateOptions;
  const search: boolean = type === 'text' && email.test(value);
  return search || errorStatus(true, 'email is not correct');
};
export const passwordValidation = ({
  value,
  type
}: IValidationInput): IErrorInput => {
  const {
    password: { length }
  } = validateOptions;
  const passwordLength: boolean = type === 'password' && length < value.length;
  return (
    passwordLength ||
    errorStatus(true, `this password must no less ${length} symbols`)
  );
};
