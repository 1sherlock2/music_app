import React, { useCallback, useMemo, useState } from 'react';
import Close from '../Icons/Close';
import {
  IErrorInput,
  IInput,
  IInputStyle,
  ITypeInput
} from './Input.interface';
import classnames from 'classnames';
import s from './Input.scss';
import IconVisibilityOff from '../Icons/Visibility/VisibilityOff';
import IconVisibility from '../Icons/Visibility/Visibility';
import { errorStatus, validateOptions } from './validateOptions';

const Input: React.FC<IInput> = ({
  type,
  placeholder,
  onChange,
  value,
  size = 'm',
  style = 'white',
  closeSize,
  disabled
}) => {
  const [typeInput, setTypeInput] = useState(type);
  const [disabledInput, setDisabled] = useState(true);

  const errorInput: IErrorInput = useMemo(() => {
    const {
      email,
      password: { length }
    } = validateOptions;
    const search: boolean = email.test(value);
    const passwordLength: boolean = length <= value.length;
    if (type === 'text' && !search) {
      return errorStatus(true, 'email is not correct');
    }
    if (type === 'password' && !passwordLength) {
      return errorStatus(true, `this password must no less ${length} symbols`);
    }
    return !!(search && passwordLength);
  }, [value]);

  const IconSize: any = {
    s: '28px',
    m: '32px',
    l: '36px'
  };

  const closeHandler = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    onChange('');
  };

  const handleChange = useCallback(
    (event) => {
      event.preventDefault();
      onChange(event.target.value);
    },
    [onChange]
  );

  const showPassword = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setTypeInput((prevState) =>
      prevState === 'password' ? 'text' : 'password'
    );
  };
  const VisibleIcon =
    typeInput === 'password' ? IconVisibility : IconVisibilityOff;

  const iconsSize = {
    color: '#333',
    size: IconSize[size]
  };

  const inputStyle: IInputStyle = {
    white: s.white,
    pink: s.pink
  };

  const inputClass = classnames(
    type !== 'submit' ? s.container_input : s.submitClass,
    s[size],
    inputStyle[style],
    { [s.disabled]: disabled }
  );
  return (
    <div className={s.container}>
      {type === 'submit' && (
        <input
          type={type}
          value={value}
          className={inputClass}
          disabled={disabledInput || disabled}
        />
      )}
      {type !== 'submit' && (
        <input
          type={typeInput}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          className={inputClass}
        />
      )}
      {type !== 'password' && closeSize && value && (
        <>
          <button
            aria-label="clear textfield"
            className={s.icon}
            onClick={closeHandler}
            disabled={disabled}
          >
            <Close {...iconsSize} />
          </button>
          {errorInput.status && value && (
            <div className={s.error}> {errorInput.message} </div>
          )}
        </>
      )}
      {type === 'password' && (
        <>
          <button
            className={s.icon}
            onClick={showPassword}
            aria-label="toggle password visibility"
          >
            <VisibleIcon {...iconsSize} />
          </button>
          {errorInput.status && value && (
            <div className={s.error}> {errorInput.message} </div>
          )}
        </>
      )}
    </div>
  );
};

export default Input;
