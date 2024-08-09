import React from 'react';
import { NextPageContext } from 'next';
import { redirect } from 'next/navigation';
import style from '@/app/styles/pages/ErrorPage.module.scss';
import { Layout } from '@/app/src/widget/Layout/Layout';

interface ErrorProps {
  statusCode: number;
}

const ErrorPage = ({ statusCode }: ErrorProps) => {
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

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
