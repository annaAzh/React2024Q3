import { useAppSelector } from 'app/redux/hooks/useAppSelector';
import { getControllForm } from 'app/redux/selectors/controllFormSelectors';
import { Link } from 'react-router-dom';
import { Details } from 'shared/components/Details/Details';
import { Path } from 'shared/types/routePaths';
import styles from './Main.module.css';

export const Main = () => {
  const { controllForm } = useAppSelector(getControllForm);

  return (
    <>
      <Link to={Path.controlFrom}>Controll form</Link>
      <Link to={Path.unControlFrom}>Un Controll form</Link>
      <h1 className={styles.title}>Main page</h1>

      <div className={styles.forms_wrapper}>
        <div className={styles.forms}>
          <h2 className={styles.subtitle}>React Hook Forms</h2>

          {controllForm.map((form, i) => {
            return <Details key={i} {...form} />;
          })}
        </div>

        <div className={styles.forms}>
          <h2 className={styles.subtitle}>Uncontrolled Forms</h2>
        </div>
      </div>
    </>
  );
};
