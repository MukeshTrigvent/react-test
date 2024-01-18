import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddressState {
  address: string;
  state: string;
  city: string;
  country: string;
  pincode: string;
}

const initialState: AddressState = {
  address: '',
  state: '',
  city: '',
  country: '',
  pincode: '',
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    updateAddressDetails: (state, action: PayloadAction<Partial<AddressState>>) => {
      return { ...state, ...action.payload };
    },
    resetAddressDetails: (state) => {
      return initialState;
    },
  },
});

export const { updateAddressDetails, resetAddressDetails } = addressSlice.actions;
export default addressSlice.reducer;