import { ToggleButton } from 'shared/components';
import { Outlet, useLoaderData, useNavigation } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/node';
import { SearchRequest } from 'shared/api/searchRequest';
import { Pagination } from 'widget/Pagination';
import { Search } from 'features/search';
import { List } from 'widget/List';
import { Favourite } from 'widget/Favourite';
import style from 'pages/SearchPage/SearchPage.module.css';
import { Loader } from 'shared/components/Loader/Loader';
import { json } from '@remix-run/node';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') || '';
  const page = url.searchParams.get('page') || 1;
  const data = await SearchRequest(search, Number(page));
  return json({ data, search, page });
};

export default function MainPage() {
  const { data, search, page } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const heroes = data?.results ? data?.results : [];

  return (
    <>
      <div className={style.controls_block}>
        <Search initialValue={search} />
        <ToggleButton />
      </div>

      {navigation.state === 'loading' && <Loader />}
      {navigation.state !== 'loading' && (
        <>
          <div className={style.wrapper}>
            {heroes.length > 0 && (
              <>
                <List heroes={heroes} />
                <Favourite />
              </>
            )}
            {heroes.length === 0 && <h2 className={style.title}>No results found</h2>}
            <Outlet />
          </div>
          {data?.info?.pages && heroes.length > 0 && (
            <Pagination totalPage={data?.info?.pages} currentPage={Number(page)} siblings={1} searchValue={search} />
          )}
        </>
      )}
    </>
  );
}
