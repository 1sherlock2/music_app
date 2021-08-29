import React, { useCallback, useState } from 'react';
import Close from '../Icons/Close';
import { IInput, IInputStyle, ITypeInput } from './Input.interface';
import classnames from 'classnames';
import s from './Input.scss';
import IconVisibilityOff from '../Icons/Visibility/VisibilityOff';
import IconVisibility from '../Icons/Visibility/Visibility';

const Input: React.FC<IInput> = ({
  type,
  placeholder,
  onChange,
  value,
  size = 'm',
  style= 'white'
  closeSize
}) => {
  const [typeInput, setTypeInput] = useState(type);

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
    pink: s.pink,
  }

  const inputClass = classnames(
    type !== 'submit' ? s.container_input : s.submitClass,
    s[size], inputStyle[style]
  );
  return (
    <div className={s.container}>
      {type === 'submit' && (
        <input type={type} value={value} className={inputClass} />
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
        <button
          aria-label="clear textfield"
          className={s.icon}
          onClick={closeHandler}
        >
          <Close {...iconsSize} />
        </button>
      )}
      {type === 'password' && (
        <button
          className={s.icon}
          onClick={showPassword}
          aria-label="toggle password visibility"
        >
          <VisibleIcon {...iconsSize} />
        </button>
      )}
    </div>
  );
};

export default Input;
