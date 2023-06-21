import { BaseService } from "../base/base.service";
import {
  BoletaStudentData,
  CalificacionesData,
  KardexStudentData,
  LoginStudentData,
  LogoutStudentData,
  SigninStudentData,
  ValidarCalificacionesData,
} from "./student.service.types";
import Cookies from "universal-cookie";
import {
  LoginStudentResponse,
  SigninStudentResponse,
  StudentCalificacionesResponse,
} from "src/state/student/student.store.types";
import { isSSR } from "src/helpers/ssr";

export class StudentService {
  private http: BaseService;
  private endpoint = "/alumno";

  constructor() {
    this.http = new BaseService(this.endpoint);
  }

  public static getCookieTokenName(): string {
    return "auth-token";
  }

  public setSession(token: string | null): void {
    if (token) {
      const cookies = new Cookies();
      let expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + 1 * 7);
      cookies.set(StudentService.getCookieTokenName(), token, {
        path: "/",
        expires: expiresDate,
      });
      !isSSR && localStorage.setItem("token", JSON.stringify(token));
    } else {
      StudentService.removeToken();
    }
  }

  public static removeToken(): void {
    const cookies = new Cookies();
    cookies.remove(StudentService.getCookieTokenName(), {
      path: "/",
    });
    !isSSR && localStorage.removeItem("token");
  }

  public static getToken(): string {
    const cookies = new Cookies();
    return cookies.get(StudentService.getCookieTokenName());
  }

  public signinStudent = async (
    data: SigninStudentData
  ): Promise<SigninStudentResponse> => {
    const response: SigninStudentResponse = await this.http.post(`/register`, {
      ...data,
    });
    this.setSession(response.user.api_token);
    return response;
  };

  public loginStudent = async (
    data: LoginStudentData
  ): Promise<LoginStudentResponse> => {
    const response: LoginStudentResponse = await this.http.post(`/login`, {
      ...data,
    });
    this.setSession(response.user.api_token);
    return response;
  };

  public logoutStudent = async (data: LogoutStudentData): Promise<any> => {
    const response: any = await this.http.post(`/logout`, { ...data });
    return response;
  };

  public getKardex = async (data: KardexStudentData): Promise<any> => {
    const response: any = await this.http.post(`/kardex`, { ...data });
    return response;
  };

  public getBoleta = async (data: BoletaStudentData): Promise<any> => {
    const response: any = await this.http.post(`/boleta`, { ...data });
    return response;
  };

  public validateCalificaciones = async (
    data: ValidarCalificacionesData
  ): Promise<any> => {
    const response: any = await this.http.post(`/validar`, { ...data });
    return response;
  };

  public getCalificaciones = async (
    data: CalificacionesData
  ): Promise<StudentCalificacionesResponse> => {
    const response: StudentCalificacionesResponse = await this.http.post(
      `/calificaciones`,
      { ...data }
    );
    return response;
  };

  public updateDatosComplementarios = async (
    id_alumno: number,
    data: any
  ): Promise<any> => {
    const response: any = await this.http.post(`/datosComplementarios`, {
      ...data,
      id_alumno,
    });
    this.setSession(response.user.api_token);
    return response;
  };

  public logoutStudent = async (data: LogoutStudentData): Promise<any> => {
    const response: any = await this.http.post(`/logout`, { ...data });
    return response;
  };

  public getKardex = async (data: KardexStudentData): Promise<any> => {
    const response: any = await this.http.post(`/kardex`, { ...data });
    return response;
  };

  public getBoleta = async (data: BoletaStudentData): Promise<any> => {
    const response: any = await this.http.post(`/boleta`, { ...data });
    return response;
  };

  public validateCalificaciones = async (
    data: ValidarCalificacionesData
  ): Promise<any> => {
    const response: any = await this.http.post(`/validar`, { ...data });
    return response;
  };

  public getCalificaciones = async (
    data: CalificacionesData
  ): Promise<StudentCalificacionesResponse> => {
    const response: StudentCalificacionesResponse = await this.http.post(
      `/calificaciones`,
      { ...data }
    );
    return response;
  };
}
