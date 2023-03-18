import React from 'react';
import { useSetFileName } from '../../store';
import classes from './CustomFile.module.scss';

interface CustomFileProps {
  label: string;
  name: string;
  error: string;
}

const CustomFile: React.FC<CustomFileProps> = ({ label, name, error }) => {
  const [fileError, setFileError] = React.useState(error);
  const [fileName, setFileName] = useSetFileName(state => [state.fileName, state.setFileName]);

  const setFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const res = e.target.files[0];
      res?.name ? setFileName(res?.name) : setFileName();
      setFileError('');
    }
  };

  React.useEffect(() => {
    setFileError(error);
  }, [error]);

  return (
    <div className={classes.customFile}>
      <p>{label}</p>
      <label>
        <span>Выберите файл</span>
        <input type="file" name={name} accept="image/png, image/jpeg, image/jpg" onChange={setFile} />
        <span>{fileName}</span>
      </label>
      {fileError === name && <p className={classes.error}>Выберите файл!</p>}
    </div>
  );
};

export default CustomFile;
