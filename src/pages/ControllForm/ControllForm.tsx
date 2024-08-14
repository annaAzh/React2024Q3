import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Path } from 'shared/types/routePaths';

export const ControllForm: FC = () => {
  return (
    <>
      <Link to={Path.main}>Main</Link>
      <h1>React Hook Forms</h1>
    </>
  );
};
