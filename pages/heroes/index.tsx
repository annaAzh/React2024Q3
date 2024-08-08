import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import React from 'react';
import { List } from 'widget/List';
import { Pagination } from 'widget/Pagination';
import { Search } from 'features/search';
import { ToggleButton } from 'shared/components';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getFavourites } from 'features/controlFavoriteMovies';
import { HeroResponse, Paths } from 'shared/types';
import { Favourite } from 'widget/Favourite';
import { SearchRequest } from 'shared/api/searchRequest';
import { Layout } from 'widget/Layout/Layout';
import { Hero } from 'widget/Hero/Hero';
import style from '../../src/app/styles/pages/SearchPage.module.scss';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const page = Array.isArray(query.page) ? query.page[0] : query.page || 1;
  const search = Array.isArray(query.search) ? query.search[0] : query.search || '';
  const id = Array.isArray(query.id) ? query.id[0] : query.id;

  const data = await SearchRequest(search, Number(page));
  let currentHero: HeroResponse | null = null;

  if (!page) {
    return {
      redirect: {
        destination: `${Paths.base}?page=1&search=${search}`,
        permanent: false,
      },
    };
  }

  if (id && data?.results) {
    currentHero = data?.results.find((hero: HeroResponse) => hero.id === +id) || null;
  }
  return { props: { data, currentHero, currentPage: Number(page), initialSearch: search } };
};

const Home = ({
  data,
  currentHero,
  currentPage,
  initialSearch,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const favourite = useSelector(getFavourites);
  const heroes = data?.results ? data?.results : [];

  const onSubmitSearch = (value: string) => {
    router.push({ pathname: Paths.base, query: { search: value, page: 1 } });
  };

  const onResetSearch = () => {
    router.push({ pathname: Paths.base, query: { search: '', page: 1 } });
  };

  const onChangePage = (page: number) => {
    const { search } = router.query;
    router.push({
      pathname: router.pathname,
      query: { search, page },
    });
  };

  return (
    <div>
      <Head>
        <title>React2024Q3</title>
        <meta name="react homework" content="rs school" />
      </Head>
      <Layout>
        <div className={style.controls_block}>
          <Search onSubmitSearch={onSubmitSearch} onResetSearch={onResetSearch} initialValue={initialSearch} />
          <ToggleButton />
        </div>
        <>
          <div className={style.wrapper}>
            {heroes.length > 0 && (
              <>
                <List heroes={heroes} />
                {favourite?.heroes.length > 0 && <Favourite />}
              </>
            )}
            {heroes.length === 0 && <h2 className={style.title}>No results found</h2>}

            {currentHero && <Hero hero={currentHero} />}
          </div>

          {data?.info?.pages && heroes.length > 0 && (
            <Pagination
              totalPage={data?.info?.pages}
              currentPage={Number(currentPage)}
              siblings={1}
              onChangePage={onChangePage}
            />
          )}
        </>
      </Layout>
    </div>
  );
};

export default Home;
