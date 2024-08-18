import { FC, useRef, useState } from 'react';
import * as yup from 'yup';
import { useAppSelector } from 'app/redux/hooks/useAppSelector';
import { useAppDispatch } from 'app/redux/hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { schema } from 'shared/lib/validation/validationSchema';
import { Path } from 'shared/types/routePaths';
import { getCountries } from 'app/redux/selectors/countriesSelectors';
import style from './UncontrolledForm.module.css';
import { addFUnControllForm } from 'app/redux/slices/formsSlice';
import { Errors, FormInputs } from 'shared/types/formTypes';
import { imageToBase64 } from 'shared/lib/utils/helpers';
import { PasswordStrength } from '../PasswordStrength/PasswordStrength';

export const UncontrolledForm: FC = () => {
  const dispatch = useAppDispatch();
  const { countries } = useAppSelector(getCountries);
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Errors>({});

  const onSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const formData: FormInputs = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value) || 0,
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirm: confirmRef.current?.value || '',
      gender: genderRef.current?.value === 'male' ? 'male' : 'female',
      terms: termsRef.current?.checked || false,
      file: fileRef.current?.files || ({} as FileList),
      country: countryRef.current?.value || '',
    };

    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      const imageBase64 = await imageToBase64(formData.file[0]);
      const convertedData = { ...formData, file: imageBase64 };
      dispatch(addFUnControllForm(convertedData));
      navigate(`${Path.main}`);
    } catch (validationErrors) {
      if (validationErrors instanceof yup.ValidationError) {
        const newErrors: Errors = {};
        validationErrors.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error('Unexpected error:', validationErrors);
      }
    }
  };

  return (
    <form className={style.form} onSubmit={onSubmitHandler}>
      <label htmlFor="name">Name</label>
      <input ref={nameRef} className={style.input} id="name" type="text" />
      {errors.name && <p className={style.errors}>{errors.name}</p>}

      <label htmlFor="age">Age</label>
      <input ref={ageRef} className={style.input} id="age" type="number" />
      {errors.age && <p className={style.errors}>{errors.age}</p>}

      <label htmlFor="email">Email</label>
      <input ref={emailRef} className={style.input} id="email" type="text" />
      {errors.email && <p className={style.errors}>{errors.email}</p>}

      <label htmlFor="password">Password</label>
      <input ref={passwordRef} className={style.input} id="password" type="password" autoComplete="true" />
      {errors.password && <p className={style.errors}>{errors.password}</p>}

      <PasswordStrength password={passwordRef.current?.value || ''} />

      <label htmlFor="confirm-password">Confirm Password</label>
      <input ref={confirmRef} className={style.input} id="confirm-password" type="password" autoComplete="true" />
      {errors.confirm && <p className={style.errors}>{errors.confirm}</p>}

      <label>Gender</label>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <label htmlFor="gender">Male</label>
        <input ref={genderRef} name="gender" id="male" type="radio" value="male" checked />
        <label htmlFor="femail">Female</label>
        <input ref={genderRef} name="gender" id="femail" type="radio" value="female" />
      </div>
      {errors.gender && <p className={style.errors}>{errors.gender}</p>}

      <label htmlFor="terms" className={style.marginBottom}>
        <input ref={termsRef} name="terms" id="terms" type="checkbox" />I accept Terms and Conditions
      </label>
      {errors.terms && <p className={style.errors}>{errors.terms}</p>}

      <label htmlFor="image">Upload picture</label>
      <input ref={fileRef} className={style.marginBottom} id="image" type="file" alt="image" />
      {errors.file && <p className={style.errors}>{errors.file}</p>}

      <label htmlFor="country">Country</label>
      <input ref={countryRef} className={style.input} id="country" type="text" list="countries-list" />
      {errors.country && <p className={style.errors}>{errors.country}</p>}

      <datalist className={style.input} id="countries-list">
        {countries.map((country) => {
          return <option key={country}>{country}</option>;
        })}
      </datalist>
      <button className={style.submit} type="submit">
        Submit
      </button>
    </form>
  );
};
