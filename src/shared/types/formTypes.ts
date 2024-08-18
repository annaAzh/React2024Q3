export interface FormInputs {
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

export interface ConvertedFormInputs {
  name: string;
  age: number;
  email: string;
  password: string;
  confirm: string;
  gender: 'male' | 'female';
  terms: boolean;
  file: string;
  country: string;
}

export interface Errors {
  [key: string]: string | undefined;
}
