import React, { useCallback, useEffect, useState, SetStateAction } from 'react';
import Close from '../Icons/Close';
import { IIconSize, IInput, IInputStyle } from './Input.interface';
import classnames from 'classnames';
import s from './Input.scss';
import IconVisibilityOff from '../Icons/Visibility/VisibilityOff';
import IconVisibility from '../Icons/Visibility/Visibility';
import {
  emailValidation,
  passwordValidation
} from './validation/validateOptions';

const Input: React.FC<IInput> = ({
  type = 'text',
  placeholder,
  onChange,
  value,
  size = 'm',
  style = 'white',
  closeSize,
  disabled,
  validate,
  className
}) => {
  const [typeInput, setTypeInput] = useState(type);
  const [errorData, setErrorData] =
    useState<SetStateAction<boolean | object>>(false);

  useEffect(() => {
    const validationData = { type, value };
    const errorInput = {
      email: emailValidation(validationData),
      password: passwordValidation(validationData)
    };
    setErrorData(errorInput);
  }, [value]);

  const IconSize: IIconSize = {
    s: '28px',
    m: '32px',
    l: '36px'
  };

  const iconTopPosition: string =
    s[`clear_top_pos_${size === 's' ? 0 : size === 'm' ? 2 : 4}`];

  const closeHandler = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    onChange && onChange('');
  };

  const handleChange = useCallback(
    (event) => {
      event.preventDefault();
      onChange && onChange(event.target.value);
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
    <div className={classnames(className, s.container)}>
      {type === 'submit' && (
        <input
          type={type}
          value={value}
          className={inputClass}
          disabled={disabled}
        />
      )}
      {type !== 'submit' && !!onChange && (
        <input
          type={typeInput}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          className={inputClass}
        />
      )}
      {type !== 'password' && closeSize && value && !!onChange && (
        <>
          <button
            aria-label="clear textfield"
            className={classnames(s.icon, iconTopPosition)}
            onClick={closeHandler}
            disabled={disabled}
          >
            <Close {...iconsSize} />
          </button>
          {errorData && errorData[validate]?.status && value && (
            <div className={s.error}> {errorData[validate]?.message} </div>
          )}
        </>
      )}
      {type === 'password' && (
        <>
          <button
            className={classnames(s.icon, iconTopPosition)}
            onClick={showPassword}
            aria-label="toggle password visibility"
          >
            <VisibleIcon {...iconsSize} />
          </button>
          {errorData && errorData[validate]?.status && value && (
            <div className={s.error}> {errorData[validate]?.message} </div>
          )}
        </>
      )}
    </div>
  );
};

export default Input;
