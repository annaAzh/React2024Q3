import { FC } from 'react';
import style from './Form.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from 'shared/lib/validation/validationSchema';
import { FormInputs } from 'shared/types/formTypes';
import { useAppDispatch } from 'app/redux/hooks/useAppDispatch';
import { addFControllForm } from 'app/redux/slices/formsSlice';
import { useAppSelector } from 'app/redux/hooks/useAppSelector';
import { getCountries } from 'app/redux/selectors/countriesSelectors';
import { useNavigate } from 'react-router-dom';
import { Path } from 'shared/types/routePaths';
import { imageToBase64 } from 'shared/lib/utils/helpers';
import { PasswordStrength } from '../PasswordStrength/PasswordStrength';

export const Form: FC = () => {
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector(getCountries);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<FormInputs>({ resolver: yupResolver(schema), mode: 'all' });

  const onSubmitHandler = async (data: FormInputs) => {
    const imageBase64 = await imageToBase64(data.file[0]);
    const convertedData = { ...data, file: imageBase64 };

    dispatch(addFControllForm(convertedData));
    reset();
    navigate(`${Path.main}`);
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

      <PasswordStrength password={watch('password')} />

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
        {countries.map((country) => {
          return <option key={country}>{country}</option>;
        })}
      </datalist>
      <button className={style.submit} type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};