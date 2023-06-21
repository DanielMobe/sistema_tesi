import { combineReducers } from "redux";

import { StudentReducer } from "./student/student.store.reducer";
import { TeacherReducer } from "./teacher/teacher.store.reducer";
import snackbarReducer from "./ducks/snackbar";
import { AdminReducer } from "./admin/admin.store.reducer";

const appReducer = combineReducers({
  student: StudentReducer,
  teacher: TeacherReducer,
  snackbar: snackbarReducer,
  admin: AdminReducer,
});

export const rootReducer = (state: any, action: any): any => {
  if (action.type === "[User] User logout") {
    state = undefined;
  }
  return appReducer(state, action);
};

export type AppState = ReturnType<typeof appReducer>;
