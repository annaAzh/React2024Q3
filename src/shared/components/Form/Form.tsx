import { FC } from 'react';
import style from './Form.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { countryList } from 'shared/types/countries';
import { schema } from 'shared/lib/validation/validationSchema';

interface FormInputs {
  name: string;
  age: number;
  email: string;
  password: string;
  confirm: string;
  gender: 'male' | 'female';
  terms: boolean;
  file: FileList;
  country: string;
}

export const Form: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormInputs>({ resolver: yupResolver(schema), mode: 'all' });

  const onSubmitHandler = (data: FormInputs) => {
    console.log(data);
    reset();
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmitHandler)}>
      <label htmlFor="name">Name</label>
      <input {...register('name')} className={style.input} id="name" type="text" />
      <p className={style.errors}>{errors.name?.message}</p>

      <label htmlFor="age">Age</label>
      <input {...register('age')} className={style.input} id="age" type="number" />
      <p className={style.errors}>{errors.age?.message}</p>

      <label htmlFor="email">Email</label>
      <input {...register('email')} className={style.input} id="email" type="text" />
      <p className={style.errors}>{errors.email?.message}</p>

      <label htmlFor="password">Password</label>
      <input {...register('password')} className={style.input} id="password" type="password" autoComplete="true" />
      <p className={style.errors}>{errors.password?.message}</p>

      <label htmlFor="confirm-password">Confirm Password</label>
      <input
        {...register('confirm')}
        className={style.input}
        id="confirm-password"
        type="password"
        autoComplete="true"
      />
      <p className={style.errors}>{errors.confirm?.message}</p>

      <label>Gender</label>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <label htmlFor="gender">Male</label>
        <input {...register('gender')} name="gender" id="male" type="radio" value="male" />
        <label htmlFor="femail">Female</label>
        <input {...register('gender')} name="gender" id="femail" type="radio" value="female" />
      </div>
      <p className={style.errors}>{errors.gender?.message}</p>

      <label htmlFor="terms" className={style.marginBottom}>
        <input {...register('terms')} name="terms" id="terms" type="checkbox" />I accept Terms and Conditions
      </label>
      <p className={style.errors}>{errors.terms?.message}</p>

      <label htmlFor="image">Upload picture</label>
      <input {...register('file')} className={style.marginBottom} id="image" type="file" alt="image" />
      <p className={style.errors}>{errors.file?.message}</p>

      <label htmlFor="country">Country</label>
      <input {...register('country')} className={style.input} id="country" type="text" list="countries-list" />
      <p className={style.errors}>{errors.country?.message}</p>

      <datalist className={style.input} id="countries-list">
        {countryList.map((country) => {
          return <option key={country}>{country}</option>;
        })}
      </datalist>
      <button className={style.submit} type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};
