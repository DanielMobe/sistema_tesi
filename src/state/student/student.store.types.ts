export enum userStateTypes {
  USER_LOGOUT = "[User] User logout",
  SET_SIGN_IN_STUDENT_DATA = "[Student] Set student info after sign in",
  LOG_IN_STUDENT = "[Student] Login Student",
  SET_STUDENT_DATA = "[Student] Set student data",
}

export type StudentDataT = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  matricula: string;
  tipo: number;
  tipo_str: number;
  status: number;
  CURP: string;
};

export type StudentData = {
  data: StudentDataT;
  isLogin: boolean;
};

export type SigninStudentData = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  matricula: string;
};

export type setSigninStudent = {
  type: typeof userStateTypes.SET_STUDENT_DATA;
  payload: StudentDataT;
};

export type SigninStudentResponse = {
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

export type LoginStudentResponse = {
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
  Registrada: boolean;
  Validada: boolean;
};

export type StudentCalificacionesResponse = {
  menssage: string;
  action: string;
  calificaciones: CalificacionesT[];
  codigo: number;
};

export type LogoutStudentT = {
  type: typeof userStateTypes.USER_LOGOUT;
};

export type StudentStateTypeAction = setSigninStudent | LogoutStudentT;
