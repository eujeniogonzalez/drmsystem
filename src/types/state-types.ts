import { store } from '../store/index';

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
