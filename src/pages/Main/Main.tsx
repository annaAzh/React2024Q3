import { Link } from 'react-router-dom';
import { Path } from 'shared/types/routePaths';

export const Main = () => {
  return (
    <>
      <Link to={Path.controlFrom}>Controll form</Link>
      <Link to={Path.unControlFrom}>Un Controll form</Link>
      <h1>Main page</h1>
    </>
  );
};
