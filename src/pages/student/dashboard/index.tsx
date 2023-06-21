import { Button, Card, CardContent, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import useMediaQueryUpHook from "src/hooks/useMediaQuery";
import { AuthService } from "src/services/auth/auth.service";
import { StudentService } from "src/services/student/student.service";
import { setSnackbar } from "src/state/ducks/snackbar";
import { AppState } from "src/state/reducer";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import StudentValidatorDialog from "src/components/dialogs/studentValidateScore.dialog";
import ValidateRegValAlumn from "src/components/validateRegValAlumn";
import DataGridTESI from "src/components/DataGridTESI";
import { errorsHandle } from "src/helpers/errorsHandle";
import LoaderSpinerSubmit from "src/components/isLoadingSpinner";
import StudentFillDataDialog from "src/components/dialogs/studentFillData.dialog";

type CalificacionesStateT = {
  id: number;
  materia_name: string;
  calificacionInt: string;
  periodo: string;
  maestro_name: string;
};

const DashboardStudent = () => {
  const router = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((state: AppState) => state.student.isLogin);
  const studentData = useSelector((state: AppState) => state.student.data);
  const isMd = useMediaQueryUpHook("md");
  const [calificaciones, setcalificaciones] = useState<CalificacionesStateT[]>(
    []
  );
  const [dialog, setdialog] = useState(false);
  const [loaderKardex, setloaderKardex] = useState(false);
  const [loaderBoleta, setloaderBoleta] = useState(false);

  const columns: GridColDef[] = [
    {
      field: "maestro_name",
      headerName: "Profesor",
      disableColumnMenu: true,
      flex: isMd ? 1 : 0,
      width: 200,
    },
    {
      field: "materia_name",
      headerName: "Materia",
      disableColumnMenu: true,
      flex: isMd ? 1 : 0,
      width: 300,
    },
    {
      field: "periodo",
      headerName: "Periodo",
      align: "right",
      disableColumnMenu: true,
    },
    {
      field: "calificacionInt",
      headerName: "Calificación",
      align: "right",
      disableColumnMenu: true,
    },
    {
      field: "registrada",
      headerName: "Registrada",
      align: "center",
      disableColumnMenu: true,
      renderCell: ValidateRegValAlumn,
    },
    {
      field: "validada",
      headerName: "Validada",
      align: "center",
      disableColumnMenu: true,
      renderCell: ValidateRegValAlumn,
    },
  ];

  React.useEffect(() => {
    const token = AuthService.getToken();
    if (!token) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    getCalificaciones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitKardex = async () => {
    setloaderKardex(true);
    const service = new StudentService();
    try {
      const request = await service.getKardex({
        matricula: studentData.matricula,
        id_alumno: String(studentData.id),
      });
      if (request.menssage === "success matricula found") {
        let { kardexURL } = request;
        window.open(kardexURL, "_blank")!.focus();
      } else {
        dispatch(setSnackbar(true, "error", request.menssage));
      }
      setloaderKardex(false);
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
      setloaderKardex(false);
    }
  };

  const submitBoleta = async () => {
    setloaderBoleta(true);
    const service = new StudentService();
    try {
      const request = await service.getBoleta({
        matricula: studentData.matricula,
        id_alumno: String(studentData.id),
      });
      if (request.menssage === "success matricula found") {
        let { boletaURL } = request;
        window.open(boletaURL, "_blank")!.focus();
      } else {
        dispatch(setSnackbar(true, "error", request.menssage));
      }
      setloaderBoleta(false);
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
      setloaderBoleta(false);
    }
  };

  const validateWidth = () => {
    let widthvalidated = "100%";

    if (isMd) {
      // widthvalidated = "50%";
    }

    return widthvalidated;
  };

  const getCalificaciones = async () => {
    const service = new StudentService();
    try {
      const request = await service.getCalificaciones({
        id_alumno: String(studentData.id),
        matricula: studentData.matricula,
      });
      if (
        request.menssage !==
        "No se encontraron calificaciones para este alumno."
      ) {
        let { calificaciones } = request;
        let rows = calificaciones.map((calificacion, i) => ({
          id: i++,
          maestro_name: calificacion.maestro_name,
          materia_name: calificacion.materia_name,
          periodo: calificacion.periodo,
          calificacionInt: calificacion.calificacionInt,
          registrada: calificacion.Registrada,
          validada: calificacion.Validada,
        }));
        setcalificaciones(rows);
      }
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
    }
  };

  const openDialog = () => {
    setdialog(true);
  };

  const hideDialog = () => {
    setdialog(false);
  };

  return (
    <Box width={calificaciones.length > 0 ? "90%" : "auto"} py={2}>
      <Card
        style={{
          borderRadius: "3px",
          width: validateWidth(),
          maxWidth: "100%",
        }}
      >
        <CardContent>
          <Box
            padding="1rem"
            mb={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box mb={2} fontWeight={600}>
              Matrícula: {studentData.matricula}
            </Box>
            <Box mb={2}>Selecciona que documento descargar</Box>
            <Box
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
              width="100%"
            >
              <Button
                onClick={submitKardex}
                variant="contained"
                color="success"
                disabled={loaderKardex}
                style={{ textTransform: "capitalize" }}
              >
                <LoaderSpinerSubmit
                  isSubmitting={loaderKardex}
                  label="Kardex"
                />
              </Button>
              <Button
                onClick={submitBoleta}
                variant="contained"
                disabled={loaderBoleta}
                color="success"
                style={{ textTransform: "capitalize" }}
              >
                <LoaderSpinerSubmit
                  isSubmitting={loaderBoleta}
                  label="Boleta"
                />
              </Button>
            </Box>
          </Box>
          <Divider />
          {calificaciones.length > 0 ? (
            <>
              <Box mt={3}>
                <DataGridTESI
                  rows={calificaciones}
                  columns={columns}
                  key={"estudianteTable"}
                />
              </Box>
              {/* TODO: unmounted validar calificaciones */}
              {/* <Box width="100%" display="flex" justifyContent="center" mt={2}>
                <Button
                  onClick={openDialog}
                  variant="contained"
                  color="success"
                  style={{ textTransform: "capitalize" }}
                >
                  Validar calificaciones
                </Button>
              </Box> */}
            </>
          ) : (
            <Box textAlign="center">Aun no hay calificaciones que mostrar</Box>
          )}
        </CardContent>
      </Card>
      <StudentValidatorDialog
        title="Confirmar calificaciones"
        open={dialog}
        hideDialog={hideDialog}
        getCalificaciones={getCalificaciones}
      >
        ¿Estás seguro que las calificaciones son correctas?
      </StudentValidatorDialog>
      <StudentFillDataDialog
        title="Completar información"
        hideDialog={() => {}}
        open={!!!studentData.CURP}
        key="CompletarInformacion"
      />
    </Box>
  );
};

export default DashboardStudent;
