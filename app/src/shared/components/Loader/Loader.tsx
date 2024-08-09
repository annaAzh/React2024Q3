import { FC } from 'react';
import loader from 'app/src/assets/loader.png';
import style from './Loader.module.css';
import Image from 'next/image';

const Loader: FC = () => {
  return (
    <div className={style.loader}>
      <Image className={style.loader_img} width={100} height={100} src={loader} alt="loader" priority />
    </div>
  );
};

export { Loader };
