import { NameSpace } from '../../../const/common-const';
import { StateType } from '../../../types/state-types';

export const getToastMessage = (state: StateType): string => (
  state[NameSpace.Toast].toastMessage
);

export const getIsToastShouldBeShown = (state: StateType): boolean => (
  state[NameSpace.Toast].isToastShouldBeShown
);

