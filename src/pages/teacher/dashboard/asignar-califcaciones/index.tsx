/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router";
import { GridColDef } from "@mui/x-data-grid";
import { AuthService } from "src/services/auth/auth.service";
import { TeacherService } from "src/services/teacher/teacher.service";
import {
  MateriasT,
  SetCalificacionData,
} from "src/services/teacher/teacher.services.types";
import { setSnackbar } from "src/state/ducks/snackbar";
import { AppState } from "src/state/reducer";
import useMediaQueryUpHook from "src/hooks/useMediaQuery";
import DataGridTESI from "src/components/DataGridTESI";
import { errorsHandle } from "src/helpers/errorsHandle";
import LoaderSpinerSubmit from "src/components/isLoadingSpinner";
import { useMutation, useQuery } from "react-query";
import { removeDuplicates } from "src/helpers/removeDuplicates";
import { validateFormulary } from "src/helpers/validateFormulary";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  borderRadius: "0.3rem",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

type AlumnosByGrupoT = {
  matricula: number;
  nombre_alumno: string;
  carrera: string;
  semestre: string;
  grupo: string;
  id: number;
};

export interface PeriodosI {
  estado: number;
  id_periodo: string;
  periodo: number;
  periodo_evaluacion: string;
  year: number;
}

export interface TiposCalI {
  tipo_id: number;
  tipo_str: string;
}

const initialStateCalificacion = {
  calificacion: null,
  tipo_str: "",
  periodo: "",
};

const sendCalificacion = async (e: any, data: SetCalificacionData) => {
  e.preventDefault();
  const service = new TeacherService();
  await service.setCalificacion({ ...data });
};

const getDataToSetCalificacion = async (id_maestro: number) => {
  const service = new TeacherService();
  const response = await service.getInfoToSetCalificacion({
    id_maestro,
  });
  return response;
};

const getAlumnosByGrupo = async (id_maestro: number, grupoId: number) => {
  const service = new TeacherService();
  const response = await service.getAlumnosByGrupo({
    id_maestro,
    grupoId,
  });
  let { alumnos } = response;
  let rows = alumnos.map((alumno, i) => ({
    id: i++,
    matricula: alumno.matricula,
    nombre_alumno: `${alumno.nombre_alumno} ${alumno.apellidop_alumno} ${alumno.apellidom_alumno}`,
    carrera: alumno.carrera,
    semestre: alumno.semestre,
    grupo: alumno.grupo,
  }));
  return rows;
};

const TeacherAsignNote = () => {
  const [teacherState, setteacherState] = useState<{
    selectedGrupo: string;
    selectedMateria: string;
    selectedCarrera: string;
    alumnSelectedData: AlumnosByGrupoT | null;
  }>({
    selectedGrupo: "",
    selectedMateria: "",
    selectedCarrera: "",
    alumnSelectedData: null,
  });

  const [calificacion, setcalificacion] = useState<{
    calificacion: number | null;
    tipo_str: string;
    periodo: string;
  }>({
    ...initialStateCalificacion,
  });
  const [modal, setmodal] = useState<boolean>(false);

  const isMd = useMediaQueryUpHook("md");
  const dispatch = useDispatch();
  const history = useHistory();
  const teacherData = useSelector((state: AppState) => state.teacher.data);

  const {
    data: { grupos, materias, periodos, tipos_cal },
    isFetching,
    refetch: refetchAsignarCalificacionAllData,
    isError: isErrorGetAllData,
    error,
  } = useQuery(
    ["asignar-calificacion-all-data"],
    () => getDataToSetCalificacion(teacherData.id),
    {
      initialData: {
        grupos: [],
        materias: [],
        alumnos: [],
        periodos: [],
        tipos_cal: [],
      },
      enabled: false,
    }
  );

  const {
    isError: isgetAlumnosByGrupoError,
    error: getAlumnosByGrupoError,
    isLoading: isLoadingGetAlumnosByGrupo,
    isSuccess: isSuccessGetAlumnosByGrupo,
    data: alumnosByGrupo,
    mutateAsync: getAlumnosByGrupoMutation,
    reset: resetGetAlumnosByGrupo,
  } = useMutation(() =>
    getAlumnosByGrupo(teacherData.id, +teacherState.selectedGrupo)
  );

  const {
    isError: issendCalificacionError,
    error: sendCalificacionError,
    isLoading: isLoadingsendCalificacion,
    mutateAsync: sendCalificacionMutation,
  } = useMutation(
    (e) => {
      const tipoCal: TiposCalI = tipos_cal.find(
        (tipoCal: TiposCalI) => tipoCal.tipo_str === calificacion.tipo_str
      );
      let data: SetCalificacionData = {
        alumnoMatricula: String(teacherState.alumnSelectedData!.matricula),
        calificacionInt: calificacion.calificacion!,
        grupoId: +teacherState.selectedGrupo,
        id_maestro: teacherData.id,
        materiaId: +teacherState.selectedMateria,
        periodo: calificacion.periodo,
        tipoCal: tipoCal.tipo_id,
        tipoCalStr: calificacion.tipo_str,
      };
      return sendCalificacion(e, data);
    },
    {
      onSuccess: () => {
        dispatch(setSnackbar(true, "success", "Calificación asignada"));
        resetGetAlumnosByGrupo();
        setteacherState({
          ...teacherState,
          selectedGrupo: "",
          selectedMateria: "",
          selectedCarrera: "",
        });
        setcalificacion({
          ...initialStateCalificacion,
        });
        handleModal();
      },
    }
  );

  useEffect(() => {
    const token = AuthService.getToken();
    if (!token) {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    refetchAsignarCalificacionAllData();
  }, []);

  useEffect(() => {
    if (
      teacherState.selectedMateria !== "" &&
      teacherState.selectedGrupo !== ""
    ) {
      getAlumnosByGrupoMutation();
    }
  }, [teacherState.selectedMateria, teacherState.selectedGrupo]);

  const selectAlumn = (data: any) => {
    setteacherState({ ...teacherState, alumnSelectedData: { ...data.row! } });
    handleModal();
  };

  const handleModal = () => {
    setmodal(!modal);
    !modal &&
      setcalificacion({
        ...initialStateCalificacion,
      });
  };

  const columns: GridColDef[] = [
    {
      field: "matricula",
      headerName: "Matricula",
      disableColumnMenu: true,
    },
    {
      field: "nombre_alumno",
      headerName: "Nombre Alumno",
      disableColumnMenu: true,
      flex: isMd ? 1 : 0,
      width: 300,
    },
    {
      field: "carrera",
      headerName: "Carrera",
      disableColumnMenu: true,
      flex: isMd ? 1 : 0,
      width: 200,
    },
    {
      field: "semestre",
      headerName: "Semestre",
      align: "right",
      disableColumnMenu: true,
    },
    {
      field: "grupo",
      headerName: "Grupo",
      align: "right",
      disableColumnMenu: true,
    },
  ];

  if (isgetAlumnosByGrupoError) {
    dispatch(
      setSnackbar(
        true,
        "error",
        errorsHandle(getAlumnosByGrupoError as { response: { data: any } })
      )
    );
  }

  if (isErrorGetAllData) {
    dispatch(
      setSnackbar(
        true,
        "error",
        errorsHandle(error as { response: { data: any } })
      )
    );
  }

  if (issendCalificacionError) {
    dispatch(
      setSnackbar(
        true,
        "error",
        errorsHandle(sendCalificacionError as { response: { data: any } })
      )
    );
  }

  return (
    <Box width={isMd ? "90%" : "100%"} py={2}>
      <Card style={{ borderRadius: "3px", maxWidth: "100%" }}>
        <Box
          style={{ cursor: "pointer", width: "fit-content" }}
          display={"flex"}
          alignItems={"center"}
          onClick={() => history.push("/docente/dashboard")}
        >
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
          Regresar
        </Box>
        <CardContent>
          {isFetching ? (
            <Box
              width={"100%"}
              display="flex"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    select
                    fullWidth
                    label="Selecciona el grupo"
                    onChange={(e) =>
                      setteacherState({
                        ...teacherState,
                        selectedGrupo: e.target.value,
                      })
                    }
                    value={teacherState.selectedGrupo}
                  >
                    {grupos.map((grupo: string, i: number) => (
                      <MenuItem key={`${grupo}-${i}-group`} value={grupo}>
                        {grupo}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    select
                    fullWidth
                    label="Selecciona la carrera"
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      setteacherState({
                        ...teacherState,
                        selectedCarrera: e.target.value,
                        selectedMateria: "",
                      })
                    }
                    value={teacherState.selectedCarrera}
                  >
                    {removeDuplicates(materias, "carrera").map(
                      (materia: { carrera: string }, i: number) => (
                        <MenuItem
                          key={`${materia.carrera}-carrera`}
                          value={materia.carrera}
                        >
                          {materia.carrera}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    select
                    fullWidth
                    label="Selecciona la materia"
                    style={{ width: "100%" }}
                    onChange={(e) =>
                      setteacherState({
                        ...teacherState,
                        selectedMateria: e.target.value,
                      })
                    }
                    value={teacherState.selectedMateria}
                  >
                    {materias
                      .filter(
                        (materia: MateriasT) =>
                          materia.carrera === teacherState.selectedCarrera
                      )
                      .map((materia: MateriasT, i: number) => (
                        <MenuItem
                          key={`${materia.id_materia}-${i}-materia`}
                          value={materia.id_materia}
                        >
                          {materia.nombre} - {materia.id_materia}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <DataGridTESI
                    rows={isSuccessGetAlumnosByGrupo ? alumnosByGrupo! : []}
                    onRowClick={(e) => selectAlumn(e)}
                    loader={isLoadingGetAlumnosByGrupo}
                    columns={columns}
                    key={"alumnosByGrupoTable"}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>
      <Modal open={modal} onClose={handleModal}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Ingresa la calificación a otorgar
          </Typography>
          <Typography sx={{ mt: 2 }}>
            <Grid
              component="form"
              onSubmit={(e: any) => sendCalificacionMutation(e)}
              container
              spacing={2}
            >
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  value={`${teacherState.alumnSelectedData?.nombre_alumno}`}
                  disabled
                  label="Nombre del alumno"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  value={`${teacherState.alumnSelectedData?.carrera}`}
                  disabled
                  label="Carrera"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  value={`${teacherState.alumnSelectedData?.grupo}`}
                  disabled
                  label="Grupo"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  value={`${teacherState.alumnSelectedData?.matricula}`}
                  disabled
                  label="Matricula"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  value={`${teacherState.alumnSelectedData?.semestre}`}
                  disabled
                  label="Semestre"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Periodo"
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    setcalificacion({
                      ...calificacion,
                      periodo: e.target.value,
                    })
                  }
                  value={calificacion.periodo}
                >
                  {periodos.map((periodo: PeriodosI, i: number) => (
                    <MenuItem
                      key={`${periodo.id_periodo}-${i}-periodo`}
                      value={periodo.periodo_evaluacion}
                    >
                      {periodo.periodo_evaluacion}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Tipo de calificación"
                  style={{ width: "100%" }}
                  onChange={(e) =>
                    setcalificacion({
                      ...calificacion,
                      tipo_str: e.target.value,
                    })
                  }
                  value={calificacion.tipo_str}
                >
                  {tipos_cal.map((tipoCal: TiposCalI, i: number) => (
                    <MenuItem
                      key={`${tipoCal.tipo_id}-${i}-tipoCal`}
                      value={tipoCal.tipo_str}
                      style={{ textTransform: "capitalize" }}
                    >
                      {tipoCal.tipo_str.replaceAll("_", " ")}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Calificacion"
                  value={calificacion.calificacion}
                  onInput={(e: any) => {
                    e.target.value =
                      e.target.value <= 10
                        ? e.target.value.toString().slice(0, 2)
                        : 0;
                  }}
                  onChange={(e) =>
                    setcalificacion({
                      ...calificacion,
                      calificacion: +e.target.value,
                    })
                  }
                />
              </Grid>
              <Box mt={2} marginLeft="1rem">
                <Button
                  disabled={
                    validateFormulary(calificacion, [
                      "calificacion",
                      "tipo_str",
                      "periodo",
                    ]) || isLoadingsendCalificacion
                  }
                  variant="contained"
                  color="success"
                  type="submit"
                  style={{ textTransform: "capitalize" }}
                >
                  <LoaderSpinerSubmit
                    isSubmitting={isLoadingsendCalificacion}
                    label="Aceptar"
                  />
                </Button>
              </Box>
            </Grid>
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default TeacherAsignNote;
