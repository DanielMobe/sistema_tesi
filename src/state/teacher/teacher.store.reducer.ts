import {
  TeacherState,
  TeacherStateTypeAction,
  teacherStateTypes,
} from "./teacher.store.types";

const userInitialState: TeacherState = {
  data: {
    id: 0,
    name: "",
    lastname: "",
    email: "",
    identificador: "",
    tipo: 0,
    tipo_str: "",
    status: 0,
  },
  isLogin: false,
};

export const TeacherReducer = (
  state = userInitialState,
  action: TeacherStateTypeAction
): TeacherState => {
  switch (action.type) {
    case teacherStateTypes.SET_TEACHER_DATA:
      return {
        ...state,
        data: { ...action.payload },
        isLogin: true,
      };
    case teacherStateTypes.USER_LOGOUT:
      return state;
    default:
      return state;
  }
};
