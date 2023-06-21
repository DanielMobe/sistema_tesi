import { errorsHandle } from "src/helpers/errorsHandle";
import { AuthService } from "src/services/auth/auth.service";
import { TeacherService } from "src/services/teacher/teacher.service";
import {
  LoginTeacherData,
  LogoutData,
} from "src/services/teacher/teacher.services.types";
import { setSnackbar } from "../ducks/snackbar";
import { SigninTeacherData, teacherStateTypes } from "./teacher.store.types";

export const loginTeacher =
  (data: LoginTeacherData, router: any) =>
  async (dispatch: any): Promise<any> => {
    const service = new TeacherService();
    try {
      const response = await service.loginTeacher(data);
      service.setSession(response.maestro.api_token);
      const { created_at, updated_at, api_token, ...responseFiltered } =
        response.maestro;
      await dispatch({
        type: teacherStateTypes.SET_TEACHER_DATA,
        payload: responseFiltered,
      });
      router.push("/docente/dashboard");
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
    }
  };

export const signinTeacher = (data: SigninTeacherData, router: any) => {
  const service = new TeacherService();
  return async (dispatch: any) => {
    try {
      const response = await service.signinTeacher(data);
      service.setSession(response.maestro.api_token);
      const { created_at, updated_at, api_token, ...responseFiltered } =
        response.maestro;
      await dispatch({
        type: teacherStateTypes.SET_TEACHER_DATA,
        payload: responseFiltered,
      });
      router.push("/docente/dashboard");
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
    }
  };
};

export const teacherLogout = (data: LogoutData, router: any) => {
  const service = new TeacherService();
  return async (dispatch: any) => {
    try {
      await service.logoutTeacher(data);
      AuthService.removeToken();
      await dispatch({
        type: teacherStateTypes.USER_LOGOUT,
      });
      router.push("/docente/acceso");
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
    }
  };
};
