export enum teacherStateTypes {
  USER_LOGOUT = "[User] User logout",
  LOG_IN = "[User] Set user info login",
  SET_RE_LOGIN = "[User] Set user info after sign in",
  SET_SIGN_IN_TEACHER_DATA = "[Teacher] Set teacher info after sign in",
  SET_TEACHER_DATA = "[Teacher] Set teacher data",
}

export type SigninTeacherData = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  identificador: string;
};

export type TeacherDataT = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  identificador: string;
  tipo: number;
  tipo_str: string;
  status: number;
};

export type TeacherState = {
  data: TeacherDataT;
  isLogin: boolean;
};

export type setTeacherStudent = {
  type: typeof teacherStateTypes.SET_SIGN_IN_TEACHER_DATA;
  payload: TeacherDataT;
};

export type setTeacherData = {
  type: typeof teacherStateTypes.SET_TEACHER_DATA;
  payload: any;
};

export type teacherLogoutT = {
  type: typeof teacherStateTypes.USER_LOGOUT;
};

export type TeacherStateTypeAction =
  | setTeacherStudent
  | setTeacherData
  | teacherLogoutT;
