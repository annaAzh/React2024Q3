import { FormInputs } from 'shared/types/formData';
import { RootState } from '../config/store';
import { Identificator } from '../slices/formsSlice';

export const getControllForm = (state: RootState): FormInputs[] => {
  return state.forms.controllForm;
};

export const getUnControllForm = (state: RootState): FormInputs[] => {
  return state.forms.unControlledForm;
};

export const getFormsIdentificator = (state: RootState): Identificator | null => {
  return state.forms.lastFormId;
};
