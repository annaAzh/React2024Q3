import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormInputs } from 'shared/types/formData';

export interface ControllFormSchema {
  controllForm: FormInputs[];
}

const initialState: ControllFormSchema = {
  controllForm: [],
};

export const controllFormSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addFControllForm(state: ControllFormSchema, action: PayloadAction<FormInputs>) {
      state.controllForm = [...state.controllForm, action.payload];
    },
  },
});

export const { reducer: controllFormReducer } = controllFormSlice;
export const { addFControllForm } = controllFormSlice.actions;
