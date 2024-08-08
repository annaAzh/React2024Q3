import React from 'react';
import { NextPageContext } from 'next';
import { redirect } from 'next/navigation';
import { Layout } from 'widget/Layout/Layout';
import style from 'app/styles/pages/ErrorPage.module.scss';

interface ErrorProps {
  statusCode: number;
}

const Error = ({ statusCode }: ErrorProps) => {
  return (
    <Layout>
      <div className={style.error_block}>
        <h1 className={style.title}>Somethig wrong is going...</h1>
        {statusCode && <p className={style.title}>`An error ${statusCode} occurred on server`</p>}
        <button
          className={style.reload_btn}
          onClick={() => {
            redirect('/');
          }}
        >
          Reload
        </button>
      </div>
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;