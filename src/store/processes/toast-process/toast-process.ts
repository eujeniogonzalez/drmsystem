import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Symbols } from '../../../const/common-const';
import { ToastProcessType } from '../../../types/toast-types';

const initialState: ToastProcessType = {
  toastMessage: Symbols.Empty,
  isToastShouldBeShown: false
};

export const toastProcess = createSlice({
  name: NameSpace.Toast,
  initialState,
  reducers: {
    showToastAction: (state, action) => {
      state.isToastShouldBeShown = true
      state.toastMessage = action.payload;
    },
    hideToastAction: (state) => {
      state.isToastShouldBeShown = false;
      state.toastMessage = Symbols.Empty;
    }
  }
});

export const { showToastAction, hideToastAction } = toastProcess.actions;
