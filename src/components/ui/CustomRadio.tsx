import classes from './CustomRadio.module.scss';

interface CustomRadioProps {
    value: string
    checked: string 
    label:string
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void
}

const CustomRadio: React.FC<CustomRadioProps> = ({value,checked,label,...props}) => {
  return (
    <label className={classes.customRadio}>
      <input type="radio" value={value}  checked={value === checked ? true : false} {...props}  />
      <span>{label}</span>
    </label>
  );
};

export default CustomRadio;
