import { useRouteError } from 'react-router-dom';
import CustomLink from './components/ui/CustomLink';
import type { IRouteErrors } from './types';

const ErrorPage: React.FC = () => {
  const error = useRouteError() as IRouteErrors;
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <CustomLink path='/'>На главную</CustomLink>
    </div>
  );
};

export default ErrorPage;
