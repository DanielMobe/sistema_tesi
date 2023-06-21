import {
  StudentData,
  StudentStateTypeAction,
  userStateTypes,
} from "./student.store.types";

const userInitialState: StudentData = {
  data: {
    id: 0,
    name: "",
    lastname: "",
    email: "",
    matricula: "",
    tipo: 0,
    tipo_str: 0,
    status: 1,
    CURP: "",
  },
  isLogin: false,
};

export const StudentReducer = (
  state = userInitialState,
  action: StudentStateTypeAction
): StudentData => {
  switch (action.type) {
    case userStateTypes.SET_STUDENT_DATA:
      return {
        ...state,
        data: { ...action.payload },
        isLogin: true,
      };
    case userStateTypes.USER_LOGOUT:
      return state;
    default:
      return state;
  }
};
