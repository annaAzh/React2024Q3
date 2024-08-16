import { FC } from 'react';
import { Link } from 'react-router-dom';
import { UncontrolledForm } from 'shared/components/UncontrolledForm/UncontrolledForm';
import { Path } from 'shared/types/routePaths';

export const UncontrollForm: FC = () => {
  return (
    <>
      <Link to={Path.main}>Main</Link>
      <h1>Uncontroll Form</h1>
      <UncontrolledForm />
    </>
  );
};
