import { BaseService } from "../base/base.service";
import {
  DeleteCalificacion,
  GetAlumnosByGrupoData,
  GetAlumnosByGrupoResponse,
  GetCalificacionesResponse,
  GetGruposData,
  GetGruposResponse,
  GetInfoToSetCalificacionData,
  GetMateriasData,
  GetMateriasTeacherResponse,
  GetMyCalificaciones,
  LoginTeacherData,
  LoginTeacherResponse,
  LogoutData,
  RegisterData,
  SetCalificacionData,
  SigninTeacherResponse,
} from "./teacher.services.types";
import Cookies from "universal-cookie";
import { isSSR } from "src/helpers/ssr";

export class TeacherService {
  private http: BaseService;
  private httpMaterias: BaseService;
  private endpoint = "/maestro";
  private endpointMaterias = "/materias";

  constructor() {
    this.http = new BaseService(this.endpoint);
    this.httpMaterias = new BaseService(this.endpointMaterias);
  }

  public static getCookieTokenName(): string {
    return "auth-token";
  }
  public setSession(token: string | null): void {
    if (token) {
      const cookies = new Cookies();
      let expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + 1 * 7);
      cookies.set(TeacherService.getCookieTokenName(), token, {
        path: "/",
        expires: expiresDate,
      });
      !isSSR && localStorage.setItem("token", JSON.stringify(token));
    } else {
      TeacherService.removeToken();
    }
  }

  public static removeToken(): void {
    const cookies = new Cookies();
    cookies.remove(TeacherService.getCookieTokenName(), {
      path: "/",
    });
    !isSSR && localStorage.removeItem("token");
  }

  public static getToken(): string {
    const cookies = new Cookies();
    return cookies.get(TeacherService.getCookieTokenName());
  }

  public signinTeacher = async (
    data: RegisterData
  ): Promise<SigninTeacherResponse> => {
    const response: SigninTeacherResponse = await this.http.post("/register", {
      ...data,
    });
    return response;
  };

  public loginTeacher = async (
    data: LoginTeacherData
  ): Promise<LoginTeacherResponse> => {
    const response: LoginTeacherResponse = await this.http.post("/login", {
      ...data,
    });
    return response;
  };

  public logoutTeacher = async (data: LogoutData): Promise<any> => {
    const response: any = await this.http.post("/logout", { ...data });
    return response;
  };

  public getMaterias = async (
    data: GetMateriasData
  ): Promise<GetMateriasTeacherResponse> => {
    const response: GetMateriasTeacherResponse = await this.http.post(
      "/getMaterias",
      { ...data }
    );
    return response;
  };

  public getGrupos = async (
    data: GetGruposData
  ): Promise<GetGruposResponse> => {
    const response: GetGruposResponse = await this.http.post("/getGrupos", {
      ...data,
    });
    return response;
  };

  public getAlumnosByGrupo = async (
    data: GetAlumnosByGrupoData
  ): Promise<GetAlumnosByGrupoResponse> => {
    const response: GetAlumnosByGrupoResponse = await this.http.post(
      "/getAlumnosByGrupo",
      {
        ...data,
      }
    );
    return response;
  };

  public setCalificacion = async (data: SetCalificacionData): Promise<any> => {
    const response: any = await this.http.post("/setCalificacion", {
      ...data,
    });
    return response;
  };

  public getCalificaciones = async (
    data: GetMyCalificaciones
  ): Promise<GetCalificacionesResponse> => {
    const response: GetCalificacionesResponse = await this.http.post(
      "/getMyCalificaciones",
      {
        ...data,
      }
    );
    return response;
  };

  public deleteCalificacion = async (
    data: DeleteCalificacion
  ): Promise<any> => {
    const response: any = await this.http.post("/deleteCalificacion", {
      ...data,
    });
    return response;
  };

  public getInfoToSetCalificacion = async (
    data: GetInfoToSetCalificacionData
  ): Promise<any> => {
    const response: any = await this.httpMaterias.post(
      "/getInfoToSetCalificacion",
      {
        ...data,
      }
    );
    return response;
  };
}
