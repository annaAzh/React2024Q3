import { RootState } from '../config/store';
import { ControllFormSchema } from '../slices/controllFormSlice';

export const getControllForm = (state: RootState): ControllFormSchema => {
  return state.controllForm;
};
