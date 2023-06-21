import { Button, Card, CardContent, Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthService } from "src/services/auth/auth.service";
import { TeacherService } from "src/services/teacher/teacher.service";
import { CalificacionesT } from "src/services/teacher/teacher.services.types";
import { AppState } from "src/state/reducer";
import { useHistory } from "react-router";
import { setSnackbar } from "src/state/ducks/snackbar";
import DataGridTESI from "src/components/DataGridTESI";
import ModalGeneral from "src/components/modalGeneral";
import useMediaQueryUpHook from "src/hooks/useMediaQuery";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { errorsHandle } from "src/helpers/errorsHandle";
import LoaderSpinerSubmit from "src/components/isLoadingSpinner";

const TeacherDeleteNote = () => {
  const [modal, setmodal] = useState<boolean>(false);
  const [calificaciones, setcalificaciones] = useState<CalificacionesT[]>([]);
  const [alumnSelectedData, setalumnSelectedData] = useState<CalificacionesT>();
  const [loader, setloader] = useState<boolean>(false);
  const [getCalificacionesloader, setgetCalificacionesloader] =
    useState<boolean>(false);
  const isMd = useMediaQueryUpHook("md");
  const dispatch = useDispatch();
  const history = useHistory();

  const teacherData = useSelector((state: AppState) => state.teacher.data);

  const columns: GridColDef[] = [
    {
      field: "nombre_alumno",
      headerName: "Nombre Alumno",
      disableColumnMenu: true,
      flex: isMd ? 1 : 0,
    },
    {
      field: "apellidop_alumno",
      headerName: "Apellido Paterno",
      disableColumnMenu: true,
      flex: isMd ? 1 : 0,
    },
    {
      field: "apellidom_alumno",
      headerName: "Apellido Materno",
      disableColumnMenu: true,
      flex: isMd ? 1 : 0,
    },
    {
      field: "calificacionInt",
      headerName: "Calificacion",
      disableColumnMenu: true,
    },
    {
      field: "tipoCalStr",
      headerName: "Tipo de calificación",
      disableColumnMenu: true,
      resizable: true,
      flex: 1,
      valueGetter: (params: GridValueGetterParams) =>
        !!params.row.tipoCalStr
          ? params.row.tipoCalStr.replaceAll("_", " ")
          : "",
    },
    {
      field: "carrera",
      headerName: "Carrera",
      disableColumnMenu: true,
      flex: isMd ? 1 : 0,
    },
    {
      field: "semestre",
      headerName: "Semestre",
      disableColumnMenu: true,
    },
    {
      field: "grupo",
      headerName: "Grupo",
      disableColumnMenu: true,
    },
    {
      field: "matricula",
      headerName: "Matricula",
      disableColumnMenu: true,
    },
    {
      field: "periodo",
      headerName: "Periodo",
      disableColumnMenu: true,
    },
  ];

  useEffect(() => {
    const token = AuthService.getToken();
    if (!token) {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    getCalificaciones();
  }, []);

  const selectAlumn = (data: any) => {
    setalumnSelectedData({ ...data.row });
    handleModal();
  };

  const handleModal = () => {
    setmodal(!modal);
  };

  const getCalificaciones = async () => {
    const service = new TeacherService();
    setgetCalificacionesloader(true);
    try {
      const request = await service.getCalificaciones({
        id_maestro: teacherData.id,
      });
      if (request.calificaciones) {
        const requestFiltered = request.calificaciones.map((data) => ({
          ...data,
          ...data.alumno,
        }));
        setcalificaciones([...requestFiltered]);
        setgetCalificacionesloader(false);
      } else {
        setcalificaciones([]);
        setgetCalificacionesloader(false);
        dispatch(setSnackbar(true, "error", request.menssage));
      }
    } catch (error: any) {
      setgetCalificacionesloader(false);
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
    }
  };

  const deleteCalificacion = async () => {
    setloader(true);
    const service = new TeacherService();
    try {
      await service.deleteCalificacion({
        id_maestro: teacherData.id,
        id_calificacion: alumnSelectedData!.id,
      });
      getCalificaciones();
      handleModal();
      dispatch(
        setSnackbar(
          true,
          "success",
          "Se eliminó correctamente la calificación."
        )
      );
      setloader(false);
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
      setloader(false);
    }
  };

  return (
    <Box width={"90%"} py={2}>
      <Card style={{ borderRadius: "3px", maxWidth: "100%", minWidth: "20%" }}>
        <IconButton onClick={() => history.push("/docente/dashboard")}>
          <ArrowBackIcon />
        </IconButton>
        <CardContent>
          <Box component="form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <DataGridTESI
                  rows={calificaciones}
                  onRowClick={(e) => selectAlumn(e)}
                  columns={columns}
                  key={"alumnosByGrupoTable"}
                  loader={getCalificacionesloader}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <ModalGeneral
        key={"modal-eliminar-calificacion"}
        title="Eliminar Calificación"
        open={modal}
        handleClose={handleModal}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            ¿Estás seguro que deseas eliminar la calificación de este alumno?
          </Grid>
          <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
            <Button
              color="error"
              variant="contained"
              style={{ marginRight: 10 }}
              onClick={handleModal}
            >
              Cancelar
            </Button>
            <Button
              onClick={deleteCalificacion}
              color="success"
              type="submit"
              disabled={loader}
              variant="contained"
            >
              <LoaderSpinerSubmit isSubmitting={loader} label="Aceptar" />
            </Button>
          </Grid>
        </Grid>
      </ModalGeneral>
    </Box>
  );
};

export default TeacherDeleteNote;
