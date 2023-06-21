export type RegisterData = {
  name: string;
  email: string;
  password: string;
  lastname: string;
  identificador?: string;
};

export type LoginAdminData = {
  email: string;
  password: string;
};

export type LogoutData = {
  id: number;
};

export type GetBitacoraData = {
  id_admin: number;
  alumno_matricula: string;
  accion: string;
  user_type: string;
};

export type GetMaestroData = {
  id_admin: number;
  id_maestro: number;
};

export type GetAllMaestrosData = {
  id_admin: number;
};

export type GetAlumnoData = {
  id_admin: number;
  id_alumno: number;
};

export type GetAllAlumnosData = {
  id_admin: number;
};

export type UpdateMaestroData = {
  id_admin: number;
  id_maestro: number;
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  identificador?: string;
  status?: number;
};

export type UpdateAlumnoData = {
  id_admin: number;
  id_alumno: number;
  name?: string;
  lastname?: string;
  email?: string;
  password?: string;
  matricula?: string;
  status?: number;
};

export type DeleteMaestroData = {
  id_admin: number;
  id_maestro: number;
};

export type DeleteAlumnoData = {
  id_admin: number;
  id_alumno: number;
};

export type GetCarreraData = {
  id_carrera: number;
};

export type GetMateriaData = {
  id_materia: number;
};

export type GetAllCarrerasData = {
  id_admin: number;
};

export type UpdateCarrera = {
  id_admin: number;
  id_carrera: number;
  carrera?: string;
  no_carrera?: number;
};

export type UpdateMateria = {
  id_admin: number;
  id_materia: number;
  nombre?: string;
  cred?: number;
};

export type DeleteCarreraData = {
  id_admin: number;
  id_carrera: number;
};

export type DeleteMateriaData = {
  id_admin: number;
  id_materia: number;
};

export type ConsultaPeriodosData = {
  id_admin: number;
};

export type SetPeriodoData = {
  year: number;
  periodo: number;
  id_admin: number;
};

export type ActivarPeriodoData = {
  id_admin: number;
  periodo: number;
  year: number;
};

export type DeletePeriodoData = {
  id_periodo: string;
  id_admin: number;
};
