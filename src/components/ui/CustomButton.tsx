import type { ReactNode } from 'react';
import styles from './CustomButton.module.scss';

interface CustomButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, disabled, ...props }) => {
  return (
    <button
      className={[styles.customButton, disabled ? styles.loading : undefined].join(' ')}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CustomButton;
