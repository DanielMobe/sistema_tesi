export type SigninStudentData = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  matricula: string;
  // egreso_bachiller?: string;
  // ingreso_bachiller?: string;
  // fecha_nacimiento?: string;
  // fecha_nacimiento_madre?: string;
  // fecha_nacimiento_padre?: string;
};

export type LoginStudentData = {
  email: string;
  password: string;
};

export type LogoutStudentData = {
  id: number;
};
export type KardexStudentData = {
  id_alumno: string;
  matricula: string;
};

export type BoletaStudentData = {
  id_alumno: string;
  matricula: string;
};

export type ValidarCalificacionesData = {
  id_alumno: string;
  matricula: string;
};

export type CalificacionesData = {
  id_alumno: string;
  matricula: string;
};
