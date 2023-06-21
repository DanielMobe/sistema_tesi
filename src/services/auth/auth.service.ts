import Cookies from "universal-cookie";
import { BaseService } from "../base/base.service";
import { isSSR } from "src/helpers/ssr";

export class AuthService {
  private http: BaseService;
  private endpoint = "/";

  constructor(role: string = "/") {
    this.http = new BaseService(this.endpoint);
    this.endpoint = role;
  }

  public static getCookieTokenName(): string {
    return "auth-token";
  }

  public setSession(token: string | null): void {
    if (token) {
      const cookies = new Cookies();
      let expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + 1 * 7);
      cookies.set(AuthService.getCookieTokenName(), token, {
        path: "/",
        expires: expiresDate,
      });
      !isSSR && localStorage.setItem("token", JSON.stringify(token));
    } else {
      AuthService.removeToken();
    }
  }

  public static removeToken(): void {
    const cookies = new Cookies();
    cookies.remove(AuthService.getCookieTokenName(), {
      path: "/",
    });
    !isSSR && localStorage.removeItem("token");
  }

  public static getToken(): string {
    const cookies = new Cookies();
    return cookies.get(AuthService.getCookieTokenName());
  }

  // public getKardex = async (data: GetKardexData): Promise<any> => {
  //   const response: any = await this.http.post(`/kardex`, {
  //     matricula: data.matricula,
  //   });
  //   return response;
  // };
}
