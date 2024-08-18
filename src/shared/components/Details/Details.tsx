import { FC } from 'react';
import { ConvertedFormInputs } from 'shared/types/formTypes';
import style from './Details.module.css';

interface DetailsProps extends Omit<ConvertedFormInputs, 'confirm' | 'terms'> {
  active?: boolean;
}

export const Details: FC<DetailsProps> = (props) => {
  const { name, email, age, gender, country, active, file, password } = props;

  return (
    <div className={active ? `${style.wrapper} ${style.active}` : `${style.wrapper}`}>
      <div className={style.item_wrapper}>
        <span className={style.span}>Image:</span>
        <img className={style.image} src={file} />
      </div>

      <div className={style.item_wrapper}>
        <span className={style.span}>Name:</span>
        <p>{name}</p>
      </div>

      <div className={style.item_wrapper}>
        <span className={style.span}>Email:</span>
        <p>{email}</p>
      </div>

      <div className={style.item_wrapper}>
        <span className={style.span}>Password:</span>
        <p>{password}</p>
      </div>

      <div className={style.item_wrapper}>
        <span className={style.span}>Gender:</span>
        <p>{gender}</p>
      </div>

      <div className={style.item_wrapper}>
        <span className={style.span}>Age:</span>
        <p>{age}</p>
      </div>

      <div className={style.item_wrapper}>
        <span className={style.span}>Country:</span>
        <p>{country}</p>
      </div>
    </div>
  );
};