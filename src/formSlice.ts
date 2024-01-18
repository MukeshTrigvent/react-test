import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  name: string;
  age: number;
  sex: string;
  mobile: string;
  govIdType: string;
  govId: string;
}

const initialState: FormState = {
  name: '',
  age: 0,
  sex: '',
  mobile: '',
  govIdType: '',
  govId: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
    resetForm: (state) => {
      return initialState;
    },
  },
});

export const { updateForm, resetForm } = formSlice.actions;
export default formSlice.reducer;