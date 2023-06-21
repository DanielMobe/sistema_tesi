import {
  AdminData,
  AdminStateTypeAction,
  userStateTypes,
} from "./admin.store.types";

const userInitialState: AdminData = {
  data: {
    id: 0,
    name: "",
    lastname: "",
    email: "",
    identificador: "",
    tipo: 0,
    tipo_str: 0,
    status: 1,
  },
  isLogin: false,
};

export const AdminReducer = (
  state = userInitialState,
  action: AdminStateTypeAction
): AdminData => {
  switch (action.type) {
    case userStateTypes.SET_ADMIN_DATA:
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
