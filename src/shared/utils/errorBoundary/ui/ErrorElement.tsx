import { FC } from 'react';
import style from './ErrorBoundary.module.css';

interface ErrorElementProps {
  errorInfo?: string | null;
}

const ErrorElement: FC<ErrorElementProps> = ({ errorInfo }) => {
  return (
    <div className={style.error_block}>
      <h1 className={style.title}>Somethig wrong is going...</h1>
      {errorInfo && <p className={style.title}>{errorInfo}</p>}
      <button className={style.reload_btn} onClick={() => location.reload()}>
        Reload
      </button>
    </div>
  );
};

export { ErrorElement };
