import React from 'react';
import classes from './CustomInput.module.scss';

interface CustomInputProps {
  label: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  error: string;
  hidden?: boolean;
  readonly?: boolean;
  type?:'text' | 'number'
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  name,
  defaultValue = '',
  error,
  hidden = false,
  readonly = false,
  type = 'text'
}) => {
  const [fileError, setFileError] = React.useState(error);
  React.useEffect(() => {
    setFileError(error);
  }, [error]);
  return (
    <div className={[classes.customInput, hidden ? classes.hidden : undefined].join(' ')}>
      <label>
        {label}
        <input type={type} name={name} defaultValue={defaultValue} readOnly={readonly} />
      </label>
      {fileError === name && <p className={classes.error}>Заполните!</p>}
    </div>
  );
};

export default CustomInput;
