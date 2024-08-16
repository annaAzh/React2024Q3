import { useAppSelector } from 'app/redux/hooks/useAppSelector';
import { getControllForm, getFormsIdentificator, getUnControllForm } from 'app/redux/selectors/formsSelectors';
import { Link } from 'react-router-dom';
import { Details } from 'shared/components/Details/Details';
import { Path } from 'shared/types/routePaths';
import styles from './Main.module.css';
import { Identificator } from 'app/redux/slices/formsSlice';

export const Main = () => {
  const controllForm = useAppSelector(getControllForm);
  const unControlFrom = useAppSelector(getUnControllForm);
  const lastFormId = useAppSelector(getFormsIdentificator);

  return (
    <>
      <Link to={Path.controlFrom}>Controll form</Link>
      <Link to={Path.unControlFrom}>Un Controll form</Link>
      <h1 className={styles.title}>Main page</h1>

      <div className={styles.forms_wrapper}>
        <div className={styles.forms}>
          <h2 className={styles.subtitle}>React Hook Forms</h2>

          {[...controllForm].reverse().map((form, i) => {
            return <Details key={i} {...form} active={lastFormId === Identificator.controlled && i === 0} />;
          })}
        </div>

        <div className={styles.forms}>
          <h2 className={styles.subtitle}>Uncontrolled Forms</h2>

          {[...unControlFrom].reverse().map((form, i) => {
            return <Details key={i} {...form} active={lastFormId === Identificator.uncontrolled && i === 0} />;
          })}
        </div>
      </div>
    </>
  );
};
