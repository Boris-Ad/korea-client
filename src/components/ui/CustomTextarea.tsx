import classes from './CustomTextarea.module.scss'

interface CustomTextareaProps {
label:string
defaultValue?:string 
readonly?:boolean
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({label,defaultValue = '',readonly}) => {
    return (
  <div className={classes.customTextarea}>
    <label>
        <span>{label}</span>
        <textarea name="description" rows={3} defaultValue={defaultValue} readOnly={readonly} />
    </label>
  </div>
    );
  };
  
  export default CustomTextarea;