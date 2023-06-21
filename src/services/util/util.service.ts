import { BaseService } from "../base/base.service";
import { GetMateriasResponse } from "./util.service.types";

export class UtilService {
  private http: BaseService;
  private endpoint = "/util";

  constructor() {
    this.http = new BaseService(this.endpoint);
  }

  public getMaterias = async (): Promise<GetMateriasResponse> => {
    const response: GetMateriasResponse = await this.http.post(`/getMaterias`);
    return response;
  };

  public recoverPassword = async ({
    tipo_user,
    email,
  }: {
    tipo_user: string;
    email: string;
  }): Promise<any> => {
    const response = await this.http.post(`/recover/password`, {
      tipo_user,
      email,
    });
    return response;
  };

  public resetPassword = async ({
    tipo_user,
    code,
    pwdN,
  }: {
    tipo_user: string;
    code: string;
    pwdN: string;
  }): Promise<any> => {
    const response = await this.http.post(`/reset/password`, {
      tipo_user,
      code,
      pwdN,
    });
    return response;
  };
}
