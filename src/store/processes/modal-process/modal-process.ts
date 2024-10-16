import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../const/common-const';
import { ModalProcessType } from '../../../types/modal-types';

const initialState: ModalProcessType = {
  isModalShouldBeShown: false
};

export const modalProcess = createSlice({
  name: NameSpace.Modal,
  initialState,
  reducers: {
    showModalAction: (state) => {
      state.isModalShouldBeShown = true;
    },
    hideModalAction: (state) => {
      state.isModalShouldBeShown = false;
    }
  }
});

export const { showModalAction, hideModalAction } = modalProcess.actions;