import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './CustomLink.module.scss';

interface CustomLinkProps {
  children: ReactNode;
  path: string;
  state?: Record<string, number | string>;
  replace?:boolean
}

const CustomLink: React.FC<CustomLinkProps> = ({ children, path, ...props }) => {
  return (
    <Link to={path} className={styles.CustomLink} {...props} >
      {children}
    </Link>
  );
};

export default CustomLink;
