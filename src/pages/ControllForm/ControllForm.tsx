import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'shared/components/Form/Form';
import { Path } from 'shared/types/routePaths';

export const ControllForm: FC = () => {
  return (
    <>
      <Link to={Path.main}>Main</Link>
      <h1>React Hook Forms</h1>
      <Form />
    </>
  );
};
