import { Layout } from 'widget/Layout/Layout';
import style from '../src/app/styles/pages/NotFound.module.scss';

const Custom404 = () => {
  return (
    <Layout>
      <h1 className={style.title_404}>404</h1>
      <h2 className={style.title}>Not Found Page</h2>
    </Layout>
  );
};

export default Custom404;
