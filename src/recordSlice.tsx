import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Record {
  id: number;
  name: string;
  age: number;
  sex: string;
  mobile: string;
  govIdType: string;
  govId: string;
  address: string;
  state: string;
  city: string;
  country: string;
  pincode: string;
}

interface FormState {
  records: any[];
}

const initialState: FormState = {
  records: [],
};

const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<any>) => {
      state.records.push(action.payload);
    },
  },
});

export const { addRecord } = recordSlice.actions;
export default recordSlice.reducer;
