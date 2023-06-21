import { createContext, useReducer } from "react";
import { user } from "./reducers/user.reducer";

export interface StateTypes {
  user: string;
}

export interface ContextTypes {
  state: StateTypes;
  dispatch: ({ type, payload }: { type: string; payload?: any }) => void;
}
// initial state
const initialState = {
  user: "",
};

// create context
const Context = createContext<ContextTypes>({
  state: { user: "" },
  dispatch: () => {},
});

// combine reducer function
const combineReducers =
  (
    ...reducers: {
      (state: any, action: any): any;
      (arg0: any, arg1: any): any;
    }[]
  ) =>
  (state: any, action: any) => {
    for (let i = 0; i < reducers.length; i++)
      state = reducers[i](state, action);
    return state;
  };

// context provider
const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(combineReducers(user), initialState);
  const value = { state, dispatch };
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
