import { Link } from 'react-router-dom';
import { Path } from 'shared/types/routePaths';

export const Main = () => {
  return (
    <>
      <h1>Main page</h1>
      <Link to={Path.controlFrom}>Controll form</Link>
      <Link to={Path.unControlFrom}>Un Controll form</Link>
    </>
  );
};
