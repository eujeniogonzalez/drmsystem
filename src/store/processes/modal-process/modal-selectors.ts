import { NameSpace } from '../../../const/common-const';
import { StateType } from '../../../types/state-types';

type IsModalShouldBeShownType = boolean;

export const getIsModalShouldBeShown = (state: StateType): IsModalShouldBeShownType => state[NameSpace.Modal].isModalShouldBeShown;

