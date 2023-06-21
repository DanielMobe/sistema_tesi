import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { AuthService } from "../auth/auth.service";

import { appConfig } from "../config";

export class BaseService {
  private http: AxiosInstance;

  constructor(endpoint: string) {
    const headers: any = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    };

    const token = AuthService.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const axiosDefaultConfig: AxiosRequestConfig = {
      // baseURL: `https://controlescolar.tesi.org.mx/api${endpoint}`,
      baseURL: `${appConfig.api.url}${endpoint}`,
      responseType: "json",
      headers,
    };
    const customAxios = axios.create(axiosDefaultConfig);
    customAxios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response !== undefined) {
          const { status } = error.response;
          if (status === 401) {
            AuthService.removeToken();
          }
        }
        return Promise.reject(error);
      }
    );
    this.http = customAxios;
  }

  public async get<R>(url: string, config?: AxiosRequestConfig): Promise<R> {
    const response = await this.http.get(url, config);
    return response.data;
  }

  public async post<R>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    const response = await this.http.post(url, data, config);
    return response.data;
  }

  public async put<R>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    const response = await this.http.put(url, data, config);
    return response.data;
  }

  public async patch<R>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    const response = await this.http.patch(url, data, config);
    return response.data;
  }

  public async delete<R>(url: string, config?: AxiosRequestConfig): Promise<R> {
    const response = await this.http.delete(url, config);
    return response.data;
  }
}
