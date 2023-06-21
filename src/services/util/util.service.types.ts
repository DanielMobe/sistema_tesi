export type Materia = {
  carrera: string;
  id_materia: string;
  nombre: string;
};

export type GetMateriasResponse = {
  action: string;
  codigo: 200;
  materias: Materia[];
  menssage: string;
};
