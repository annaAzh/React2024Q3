import { FC } from 'react';
import { FormInputs } from 'shared/types/formData';
import style from './Details.module.css';

export const Details: FC<Omit<FormInputs, 'password' | 'confirm' | 'terms'>> = (props) => {
  const { name, email, age, gender, country } = props;
  return (
    <div className={`${style.wrapper} ${style.active}`}>
      <div className={style.item_wrapper}>
        <span className={style.span}>Image:</span>
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
