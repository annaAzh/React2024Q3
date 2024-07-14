import style from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div>
      <h1 className={style.title_404}>404</h1>
      <h2 className={style.title}>Not Found Page</h2>
    </div>
  );
};

export { NotFound };
