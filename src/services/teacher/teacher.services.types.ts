export type RegisterData = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  identificador?: string;
};

export type SigninTeacherResponse = {
  maestro: {
    name: string;
    lastname: string;
    email: string;
    identificador: number;
    tipo: number;
    tipo_str: string;
    status: number;
    updated_at: string;
    created_at: string;
    id: number;
    api_token: string;
  };
};

export type LoginTeacherResponse = {
  maestro: {
    id: number;
    name: string;
    lastname: string;
    email: string;
    email_verified_at: any;
    created_at: string;
    updated_at: string;
    api_token: string;
    identificador: string;
    tipo: number;
    tipo_str: string;
    status: number;
  };
};

export type MateriasT = {
  id_materia: string;
  nombre: string;
  carrera: string;
};

export type GetMateriasTeacherResponse = {
  menssage: string;
  action: string;
  materias: MateriasT[];
  codigo: number;
};

export type GetGruposResponse = {
  menssage: string;
  action: string;
  grupos: string[];
  codigo: number;
};

export type AlumnosT = {
  matricula: number;
  nombre_alumno: string;
  apellidop_alumno: string;
  apellidom_alumno: string;
  carrera: string;
  semestre: string;
  grupo: string;
};

export type GetAlumnosByGrupoResponse = {
  menssage: string;
  action: string;
  alumnos: AlumnosT[];
  codigo: number;
};

export type LoginTeacherData = {
  email: string;
  password: string;
};

export type LogoutData = {
  id: number;
};

export type GetMateriasData = {
  id_maestro: number;
};

export type GetGruposData = {
  id_maestro: number;
};

export type GetAlumnosByGrupoData = {
  id_maestro: number;
  grupoId: number;
};

export type SetCalificacionData = {
  id_maestro: number;
  grupoId: number;
  materiaId: number;
  alumnoMatricula: string;
  calificacionInt: number;
  tipoCalStr: string;
  tipoCal: number;
  periodo: string;
};

export type GetMyCalificaciones = {
  id_maestro: number;
};

export type DeleteCalificacion = {
  id_maestro: number;
  id_calificacion: number;
};

export type GetInfoToSetCalificacionData = {
  id_maestro: number;
};

export type CalificacionesT = {
  alumno?: any;
  alumnoMatricula: string;
  calificacionInt: string;
  created_at: string;
  grupoId: number;
  id: number;
  id_maestro: number;
  materiaId: number;
  periodo: string;
  tipoCal: number;
  tipoCalStr: string;
  updated_at: string;
};

export type GetCalificacionesResponse = {
  action: string;
  calificaciones: CalificacionesT[];
  codigo: number;
  menssage: string;
};
