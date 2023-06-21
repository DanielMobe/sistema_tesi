import { errorsHandle } from "src/helpers/errorsHandle";
import { AuthService } from "src/services/auth/auth.service";
import { StudentService } from "src/services/student/student.service";
import {
  LoginStudentData,
  LogoutStudentData,
} from "src/services/student/student.service.types";
import { setSnackbar } from "../ducks/snackbar";
import { SigninStudentData, userStateTypes } from "./student.store.types";

export const loginStudent = (data: LoginStudentData, router: any) => {
  const service = new StudentService();
  return async (dispatch: any) => {
    try {
      const response = await service.loginStudent({ ...data });
      service.setSession(response.user.api_token);
      const { api_token, created_at, updated_at, ...filterReponse } =
        response.user;
      await dispatch({
        type: userStateTypes.SET_STUDENT_DATA,
        payload: filterReponse,
      });
      router.push("/alumno/dashboard");
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
    }
  };
};

export const signinStudent = (data: any, router: any) => {
  const service = new StudentService();
  return async (dispatch: any) => {
    try {
      const response = await service.signinStudent({ ...data });
      service.setSession(response.user.api_token);
      const { api_token, created_at, updated_at, ...filterReponse } =
        response.user;
      await dispatch({
        type: userStateTypes.SET_STUDENT_DATA,
        payload: filterReponse,
      });
      router.push("/alumno/dashboard");
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
    }
  };
};

export const studentLogout = (data: LogoutStudentData, router: any) => {
  const service = new StudentService();
  return async (dispatch: any) => {
    try {
      await service.logoutStudent(data);
      AuthService.removeToken();
      await dispatch({
        type: userStateTypes.USER_LOGOUT,
      });
      router.push("/alumno/acceso");
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
    }
  };
};

export const studentComplementaryData = (id_alumno: number, data: any) => {
  const service = new StudentService();
  return async (dispatch: any) => {
    try {
      const response = await service.updateDatosComplementarios(
        id_alumno,
        data
      );
      const { api_token, created_at, updated_at, ...filterReponse } =
        response.user;
      await dispatch({
        type: userStateTypes.SET_STUDENT_DATA,
        payload: filterReponse,
      });
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
    }
  };
};
