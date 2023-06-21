import { errorsHandle } from "src/helpers/errorsHandle";
import { AdminService } from "src/services/admin/admin.service";
import { AuthService } from "src/services/auth/auth.service";
import { setSnackbar } from "../ducks/snackbar";
import {
  LoginAdminData,
  LogoutAdminData,
  SigninAdminData,
  userStateTypes,
} from "./admin.store.types";

export const loginAdmin = (data: LoginAdminData, router: any) => {
  const service = new AdminService();
  return async (dispatch: any) => {
    try {
      const response = await service.loginAdmin({ ...data });
      service.setSession(response.admin.api_token);
      const { api_token, created_at, updated_at, ...filterReponse } =
        response.admin;
      await dispatch({
        type: userStateTypes.SET_ADMIN_DATA,
        payload: filterReponse,
      });
      router.push("/admin/dashboard/periodos");
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
    }
  };
};

export const signinAdmin = (data: SigninAdminData, router: any) => {
  const service = new AdminService();
  return async (dispatch: any) => {
    try {
      const response = await service.signinAdmin({ ...data });
      service.setSession(response.admin.api_token);
      const { api_token, created_at, updated_at, ...filterReponse } =
        response.admin;
      await dispatch({
        type: userStateTypes.SET_ADMIN_DATA,
        payload: filterReponse,
      });
      router.push("/admin/dashboard");
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
    }
  };
};

export const adminLogout = (data: LogoutAdminData, router: any) => {
  const service = new AdminService();
  return async (dispatch: any) => {
    try {
      await service.logoutAdmin(data);
      AuthService.removeToken();
      await dispatch({
        type: userStateTypes.USER_LOGOUT,
      });
      router.push("/admin/acceso");
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
    }
  };
};
