import classes from './CustomCheckbox.module.scss';

interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  disabled?:boolean
  onChange: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ label, ...props }) => {
  return (
    <label className={classes.customCheckbox}>
      <input type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  );
};

export default CustomCheckbox;
