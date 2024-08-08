import { create } from 'zustand';
import { createJSONStorage, persist, combine } from 'zustand/middleware';
import { StoreKey } from '@/constants/enums';
import { sessionStorage } from '../store';

// define the initial state
const initialState = () => ({
  openId: '',
  token: ''
});

type State = ReturnType<typeof initialState>;
type Update =
  | State
  | Partial<State>
  | ((state: State) => State | Partial<State>);

/**
 * 当前store版本
 * 更改后需要手动修改并添加migrate逻辑
 */
const APP_STORE_VERSION: number = 0.1;

/**
 * app通用模块store
 */
export const useAppStore = create(persist(
  combine(
    initialState(),

    set => ({
      /** 通用update */
      SET_STATE: (data: Update) => set(data),

      SET_TOKEN: (token: string) => set({ token }),

      REMOVE_TOKEN: () => set({ token: '' }),

      RESET: () => set(initialState())
    })
  ),
  {
    name: StoreKey.APP, // name of the storage (needs to be unique)

    storage: createJSONStorage(sessionStorage), // (optional) storage to use for state persistence, defaults to localStorage for web

    version: APP_STORE_VERSION,

    // migration logic
    migrate: (persistedState, version) => {
      const state = {};

      if(version !== APP_STORE_VERSION) {
        Object.assign(state, persistedState);
      }

      return state;
    }
  }
));
