import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getLocaleStorage } from 'shared/utils/localeStorage/LocaleStorage';
import { Loader } from 'shared/components/Loader/Loader';
import { Layout } from 'widget/Layout/Layout';
import { Paths } from 'shared/types';

const DefaultPage = () => {
  const router = useRouter();

  useEffect(() => {
    const storedValue = getLocaleStorage() || '';

    router.push(`/${Paths.hero}?search=${encodeURIComponent(storedValue)}`);
  }, []);

  return (
    <Layout>
      <Loader />
    </Layout>
  );
};

export default DefaultPage;
