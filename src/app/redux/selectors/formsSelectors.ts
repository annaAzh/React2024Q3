import { ConvertedFormInputs } from 'shared/types/formTypes';
import { RootState } from '../config/store';
import { Identificator } from '../slices/formsSlice';

export const getControllForm = (state: RootState): ConvertedFormInputs[] => {
  return state.forms.controllForm;
};

export const getUnControllForm = (state: RootState): ConvertedFormInputs[] => {
  return state.forms.unControlledForm;
};

export const getFormsIdentificator = (state: RootState): Identificator | null => {
  return state.forms.lastFormId;
};
