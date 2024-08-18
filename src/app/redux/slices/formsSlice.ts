import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConvertedFormInputs } from 'shared/types/formTypes';

export const enum Identificator {
  controlled = 'controlled',
  uncontrolled = 'uncontrolled',
}

export interface formsSchema {
  controllForm: ConvertedFormInputs[];
  unControlledForm: ConvertedFormInputs[];
  lastFormId: Identificator.controlled | Identificator.uncontrolled | null;
}

const initialState: formsSchema = {
  controllForm: [],
  unControlledForm: [],
  lastFormId: null,
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addFControllForm(state: formsSchema, action: PayloadAction<ConvertedFormInputs>) {
      state.controllForm = [...state.controllForm, action.payload];
      state.lastFormId = Identificator.controlled;
    },
    addFUnControllForm(state: formsSchema, action: PayloadAction<ConvertedFormInputs>) {
      state.unControlledForm = [...state.unControlledForm, action.payload];
      state.lastFormId = Identificator.uncontrolled;
    },
  },
});

export const { reducer: formsReducer } = formsSlice;
export const { addFControllForm, addFUnControllForm } = formsSlice.actions;
