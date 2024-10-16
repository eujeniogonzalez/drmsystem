import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/common-const';
import { userProcess } from './processes/user-process/user-process';
import { toastProcess } from './processes/toast-process/toast-process';
import { modalProcess } from './processes/modal-process/modal-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Toast]: toastProcess.reducer,
  [NameSpace.Modal]: modalProcess.reducer
});

