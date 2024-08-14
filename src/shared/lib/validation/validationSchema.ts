import * as yup from 'yup';
import { countryList } from 'shared/types/countries';
import { FILE_EXTENSIONS, FILE_SIZE, REG_EXP } from 'shared/types/validation';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field')
    .matches(new RegExp(REG_EXP.start_lowercase), 'Name shoud start from uppercase letter'),
  age: yup
    .number()
    .positive('Age should greater than zero')
    .integer('Age should be integer')
    .required('Age is a required field'),
  email: yup
    .string()
    .trim()
    .required('Email is a required field')
    .matches(new RegExp(REG_EXP.email), 'Invalid email format'),
  password: yup
    .string()
    .trim()
    .required('Password is a required field')
    .matches(
      new RegExp(REG_EXP.special_character),
      'Password must contain at least one special character from !@#$%^&*',
    )
    .matches(new RegExp(REG_EXP.uppercase), 'Password must contain at least one uppercase letter')
    .matches(new RegExp(REG_EXP.lowercase), 'Password must contain at least one lowercase letter')
    .matches(new RegExp(REG_EXP.numbers), 'Password must contain at least one number'),
  confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password is a required field'),
  gender: yup.mixed<'male' | 'female'>().oneOf(['male', 'female']).required('You must select gender'),
  terms: yup.boolean().oneOf([true], 'You must accept the terms and conditions').required(),
  file: yup
    .mixed<FileList>()
    .test('Size', `File size must be less than ${FILE_SIZE / 1024}kb`, (value) => {
      const file = value ? (value as FileList)[0] : null;
      return file ? file.size <= FILE_SIZE : false;
    })
    .test('File Type', `Only ${FILE_EXTENSIONS.join(' and ')} files are allowed`, (value) => {
      const file = value ? (value as FileList)[0] : null;
      return file ? FILE_EXTENSIONS.includes(file.type) : false;
    })
    .required('Image is required'),
  country: yup
    .string()
    .oneOf([...countryList], 'You must select one country')
    .label('Selected Country')
    .required('You must select one country'),
});
