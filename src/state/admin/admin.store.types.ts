export enum userStateTypes {
  USER_LOGOUT = "[User] User logout",
  SET_SIGN_IN_ADMIN_DATA = "[Admin] Set Admin info after sign in",
  LOG_IN_ADMIN = "[Admin] Login Admin",
  SET_ADMIN_DATA = "[Admin] Set Admin data",
}

export type AdminDataT = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  identificador: string;
  tipo: number;
  tipo_str: number;
  status: number;
};

export type AdminData = {
  data: AdminDataT;
  isLogin: boolean;
};

export type LogoutAdminData = {
  id: number;
};

export type LoginAdminData = {
  email: string;
  password: string;
};

export type SigninAdminData = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  matricula: string;
};

export type setSigninAdmin = {
  type: typeof userStateTypes.SET_ADMIN_DATA;
  payload: AdminDataT;
};

export type SigninAdminResponse = {
  user: {
    name: string;
    lastname: string;
    email: string;
    matricula: string;
    tipo: number;
    tipo_str: string;
    status: number;
    updated_at: string;
    created_at: string;
    id: number;
    api_token: string;
  };
};

export type LoginAdminResponse = {
  user: {
    id: number;
    name: string;
    lastname: string;
    email: string;
    created_at: string;
    updated_at: string;
    api_token: string;
    matricula: string;
    tipo: number;
    tipo_str: string;
    status: number;
  };
};

export type CalificacionesT = {
  id: number;
  id_maestro: number;
  grupoId: number;
  materiaId: number;
  materia_name: string;
  alumnoMatricula: string;
  calificacionInt: string;
  tipoCal: number;
  periodo: string;
  created_at: string;
  updated_at: string;
  maestro_name: string;
};

export type AdminCalificacionesResponse = {
  menssage: string;
  action: string;
  calificaciones: CalificacionesT[];
  codigo: number;
};

export type LogoutAdminT = {
  type: typeof userStateTypes.USER_LOGOUT;
};

export type AdminStateTypeAction = setSigninAdmin | LogoutAdminT;
