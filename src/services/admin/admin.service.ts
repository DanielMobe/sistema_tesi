import { BaseService } from "../base/base.service";
import {
  ActivarPeriodoData,
  ConsultaPeriodosData,
  DeleteAlumnoData,
  DeleteCarreraData,
  DeleteMaestroData,
  DeleteMateriaData,
  DeletePeriodoData,
  GetAllAlumnosData,
  GetAllCarrerasData,
  GetAllMaestrosData,
  GetAlumnoData,
  GetBitacoraData,
  GetCarreraData,
  GetMaestroData,
  GetMateriaData,
  LoginAdminData,
  LogoutData,
  RegisterData,
  SetPeriodoData,
  UpdateAlumnoData,
  UpdateCarrera,
  UpdateMaestroData,
  UpdateMateria,
} from "./admin.services.types";
import Cookies from "universal-cookie";
import { isSSR } from "src/helpers/ssr";

export class AdminService {
  private http: BaseService;
  private endpoint = "/admin";

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
      cookies.set(AdminService.getCookieTokenName(), token, {
        path: "/",
        expires: expiresDate,
      });
      !isSSR && localStorage.setItem("token", JSON.stringify(token));
    } else {
      AdminService.removeToken();
    }
  }

  public static removeToken(): void {
    const cookies = new Cookies();
    cookies.remove(AdminService.getCookieTokenName(), {
      path: "/",
    });
    !isSSR && localStorage.removeItem("token");
  }

  public static getToken(): string {
    const cookies = new Cookies();
    return cookies.get(AdminService.getCookieTokenName());
  }

  public signinAdmin = async (data: RegisterData): Promise<any> => {
    const response: any = await this.http.post("/register", {
      ...data,
    });
    return response;
  };

  public loginAdmin = async (data: LoginAdminData): Promise<any> => {
    const response: any = await this.http.post("/login", {
      ...data,
    });
    return response;
  };

  public logoutAdmin = async (data: LogoutData): Promise<any> => {
    const response: any = await this.http.post("/logout", { ...data });
    return response;
  };

  public getBitacora = async (data: GetBitacoraData): Promise<any> => {
    const response: any = await this.http.post("/bitacora/calificaciones", {
      ...data,
    });
    return response;
  };

  public getAllMaestros = async (data: GetAllMaestrosData): Promise<any> => {
    const response: any = await this.http.post("/getAllMaestros", { ...data });
    return response;
  };

  public getMaestro = async (data: GetMaestroData): Promise<any> => {
    const response: any = await this.http.post("/getMaestro", { ...data });
    return response;
  };

  public updateMaestro = async (data: UpdateMaestroData): Promise<any> => {
    const response: any = await this.http.post("/updateMaestro", { ...data });
    return response;
  };

  public deleteMaestro = async (data: DeleteMaestroData): Promise<any> => {
    const response: any = await this.http.post("/deleteMaestro", { ...data });
    return response;
  };

  public getAllAlumnos = async (data: GetAllAlumnosData): Promise<any> => {
    const response: any = await this.http.post("/getAllAlumnos", { ...data });
    return response;
  };

  public getAlumno = async (data: GetAlumnoData): Promise<any> => {
    const response: any = await this.http.post("/getAlumno", { ...data });
    return response;
  };

  public updateAlumno = async (data: UpdateAlumnoData): Promise<any> => {
    const response: any = await this.http.post("/updateAlumno", { ...data });
    return response;
  };

  public deleteAlumno = async (data: DeleteAlumnoData): Promise<any> => {
    const response: any = await this.http.post("/deleteAlumno", { ...data });
    return response;
  };

  public getAllCarreras = async (data: GetAllCarrerasData): Promise<any> => {
    const response: any = await this.http.post("/getAllCarreras", { ...data });
    return response;
  };

  public getCarrera = async (data: GetCarreraData): Promise<any> => {
    const response: any = await this.http.post("/getCarrera", { ...data });
    return response;
  };

  public updateCarrera = async (data: UpdateCarrera): Promise<any> => {
    const response: any = await this.http.post("/updateCarrera", { ...data });
    return response;
  };

  public deleteCarrera = async (data: DeleteCarreraData): Promise<any> => {
    const response: any = await this.http.post("/deleteCarrera", { ...data });
    return response;
  };

  public getAllMaterias = async (data: GetAllCarrerasData): Promise<any> => {
    const response: any = await this.http.post("/getAllMaterias", { ...data });
    return response;
  };

  public getMateria = async (data: GetMateriaData): Promise<any> => {
    const response: any = await this.http.post("/getMateria", { ...data });
    return response;
  };

  public updateMateria = async (data: UpdateMateria): Promise<any> => {
    const response: any = await this.http.post("/updateMateria", { ...data });
    return response;
  };

  public deleteMateria = async (data: DeleteMateriaData): Promise<any> => {
    const response: any = await this.http.post("/deleteMateria", { ...data });
    return response;
  };

  public getConsultaPeriodos = async (
    data: ConsultaPeriodosData
  ): Promise<any> => {
    const response: any = await this.http.post("/consultaPeriodos", {
      ...data,
    });
    return response;
  };

  public setPeriodo = async (data: SetPeriodoData): Promise<any> => {
    const response: any = await this.http.post("/storePeriodo", { ...data });
    return response;
  };

  public activarPeriodo = async (data: ActivarPeriodoData): Promise<any> => {
    const response: any = await this.http.post("/activarPeriodo", { ...data });
    return response;
  };

  public deletePeriodo = async (data: DeletePeriodoData): Promise<any> => {
    const response: any = await this.http.post("/deletePeriodo", { ...data });
    return response;
  };
}
