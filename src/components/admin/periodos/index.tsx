import { Box, Button, Card, CardContent, Grid } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataGridTESI from "src/components/DataGridTESI";
import InputFormik from "src/components/inputFormik";
import LoaderSpinerSubmit from "src/components/isLoadingSpinner";
import ModalGeneral from "src/components/modalGeneral";
import { errorsHandle } from "src/helpers/errorsHandle";
import { validateTinyIntl } from "src/helpers/validateTinyIntl";
import { useActivarPeriodoMutation } from "src/hooks/reactQueryHooks/useActivarPeriodoMutation";
import { useCrearPeriodoMutation } from "src/hooks/reactQueryHooks/useCrearPeriodoMutation";
import useMediaQueryUpHook from "src/hooks/useMediaQuery";
import { AdminService } from "src/services/admin/admin.service";
import { setSnackbar } from "src/state/ducks/snackbar";
import { AppState } from "src/state/reducer";
import validationSchemaPeriodos from "./schemaPeriodos";

export const Periodos = () => {
  const isMd = useMediaQueryUpHook("md");
  const dispatch = useDispatch();
  const adminData = useSelector((state: AppState) => state.admin.data);
  const [dataPeriodosArray, setdataPeriodosArray] = useState([]);
  const [modal, setmodal] = useState(false);
  const [modalDeletePeriodo, setmodalDeletePeriodo] = useState({
    modal: false,
    id_periodo: "",
  });
  const [modalActivarPeriodo, setmodalActivarPeriodo] = useState({
    modal: false,
    periodo: 0,
    year: 0,
  });
  const [loaderDelete, setloaderDelete] = useState(false);
  const { mutateAsync: crearPeriodoMutation } = useCrearPeriodoMutation();
  const { mutateAsync: activarPeriodoMutation, isLoading: loaderActivate } =
    useActivarPeriodoMutation();

  const columns: GridColDef[] = [
    {
      field: "id_periodo",
      headerName: "Id Periodo",
      disableColumnMenu: true,
      flex: isMd ? 1 : 0,
    },
    {
      field: "periodo",
      headerName: "Periodo",
      disableColumnMenu: true,
      align: "center",
      flex: isMd ? 1 : 0,
    },
    {
      field: "periodo_evaluacion",
      headerName: "Periodo Evaluación",
      disableColumnMenu: true,
      align: "center",
      flex: isMd ? 1 : 0,
    },
    {
      field: "year",
      headerName: "Año",
      disableColumnMenu: true,
      align: "center",
      flex: isMd ? 1 : 0,
    },
    {
      field: "estado",
      headerName: "Estado",
      disableColumnMenu: true,
      sortable: false,
      renderCell: (data) => (
        <Box>{validateTinyIntl(data.value) ? "Activo" : "Inactivo"}</Box>
      ),
      flex: isMd ? 1 : 0,
    },
    {
      field: "edit",
      headerName: "Editar",
      disableColumnMenu: true,
      align: "center",
      disableReorder: true,
      renderCell: (e) => (
        <Button
          onClick={() =>
            setmodalActivarPeriodo({
              modal: true,
              periodo: e.row.periodo,
              year: e.row.year,
            })
          }
          style={{ textTransform: "capitalize" }}
          variant="contained"
          color="success"
        >
          Activar
        </Button>
      ),
      flex: isMd ? 1 : 0,
    },
    {
      field: "delete",
      headerName: "Eliminar",
      disableColumnMenu: true,
      align: "center",
      disableReorder: true,
      renderCell: (e) => (
        <Button
          onClick={() =>
            setmodalDeletePeriodo({
              ...modalDeletePeriodo,
              modal: true,
              id_periodo: e.row.id_periodo,
            })
          }
          style={{ textTransform: "capitalize" }}
          variant="contained"
          color="error"
        >
          Eliminar
        </Button>
      ),
      flex: isMd ? 1 : 0,
    },
  ];

  useEffect(() => {
    getPeriodos();
  }, []);

  const validateWidth = () => {
    let widthvalidated = "100%";

    if (isMd) {
      // widthvalidated = "50%";
    }

    return widthvalidated;
  };

  const getPeriodos = async () => {
    const service = new AdminService();
    try {
      const response = await service.getConsultaPeriodos({
        id_admin: adminData.id,
      });
      const responseFiltered = response.periodos.map(
        (obj: { id_periodo: any }) => ({
          ...obj,
          id: `${obj.id_periodo}periodo`,
        })
      );
      setdataPeriodosArray(responseFiltered);
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
    }
  };

  const createPeriodo = async (values: { periodo: number; year: number }) => {
    crearPeriodoMutation(
      {
        id_admin: adminData.id,
        periodo: values.periodo,
        year: values.year,
      },
      {
        onSuccess: () => {
          getPeriodos();
          setmodal(false);
          dispatch(
            setSnackbar(true, "success", "Periodo creado correctamente.")
          );
          formik.setSubmitting(false);
          formik.resetForm();
          setmodalActivarPeriodo({
            modal: false,
            periodo: 0,
            year: 0,
          });
        },
        onError: (error: any) => {
          dispatch(setSnackbar(true, "error", errorsHandle(error)));
          formik.setSubmitting(false);
        },
      }
    );
  };

  const deletePeriodo = async () => {
    setloaderDelete(true);
    const service = new AdminService();
    try {
      await service.deletePeriodo({
        id_admin: adminData.id,
        id_periodo: modalDeletePeriodo.id_periodo,
      });
      getPeriodos();
      setmodalDeletePeriodo({
        modal: false,
        id_periodo: "",
      });
      dispatch(
        setSnackbar(true, "success", "Periodo eliminado correctamente.")
      );
      setloaderDelete(false);
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
      setloaderDelete(false);
    }
  };

  const activarPeriodo = async () => {
    activarPeriodoMutation(
      {
        id_admin: adminData.id,
        periodo: modalActivarPeriodo.periodo,
        year: modalActivarPeriodo.year,
      },
      {
        onSuccess: () => {
          getPeriodos();
          dispatch(setSnackbar(true, "success", "Se activó el periodo."));
          setmodalActivarPeriodo({
            modal: false,
            periodo: 0,
            year: 0,
          });
        },
        onError: (error: any) => {
          dispatch(setSnackbar(true, "error", errorsHandle(error)));
        },
      }
    );
  };

  const formik = useFormik({
    initialValues: {
      year: 0,
      periodo: 0,
    },
    validationSchema: validationSchemaPeriodos(),
    onSubmit: createPeriodo,
  });

  return (
    <>
      <Card
        style={{
          borderRadius: "3px",
          width: validateWidth(),
          maxWidth: "100%",
          marginBottom: "2rem",
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
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box mb={2} fontWeight={800}>
                  Periodos de evaluación
                </Box>
              </Grid>
              <Grid item xs={6} display="flex" justifyContent="flex-end">
                <Button
                  onClick={() => setmodal(true)}
                  color="success"
                  variant="outlined"
                  style={{ textTransform: "capitalize" }}
                >
                  Crear Periodo
                </Button>
              </Grid>
              <Grid item xs={12}>
                <DataGridTESI
                  columns={columns}
                  rows={dataPeriodosArray}
                  key={"periodosTable"}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <ModalGeneral
        key={"modal-crear-periodo"}
        open={modal}
        handleClose={() => setmodal(false)}
        title="Crear Periodo"
      >
        <Grid
          component={"form"}
          onSubmit={formik.handleSubmit}
          container
          spacing={2}
        >
          <Grid item xs={12}>
            <InputFormik
              fullWidth
              formik={formik}
              onInput={(e: any) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 4);
              }}
              type={"number"}
              label="Año"
              InputLabelProps={{ shrink: true }}
              name="year"
            />
          </Grid>
          <Grid item xs={12}>
            <InputFormik
              fullWidth
              onInput={(e: any) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 1);
              }}
              formik={formik}
              type={"number"}
              label="Periodo"
              name="periodo"
            />
          </Grid>
          <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
            <Button
              color="error"
              variant="contained"
              style={{ marginRight: 10 }}
              onClick={() => setmodal(false)}
            >
              Cancelar
            </Button>
            <Button
              color="success"
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
              variant="contained"
            >
              <LoaderSpinerSubmit
                isSubmitting={formik.isSubmitting}
                label="Aceptar"
              />
            </Button>
          </Grid>
        </Grid>
      </ModalGeneral>
      <ModalGeneral
        key={"modal-delete-periodo"}
        title="Eliminar periodo"
        open={modalDeletePeriodo.modal}
        handleClose={() =>
          setmodalDeletePeriodo({
            ...modalDeletePeriodo,
            modal: false,
            id_periodo: "",
          })
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            ¿Estás seguro que deseas eliminar este periodo?
          </Grid>
          <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
            <Button
              color="error"
              variant="contained"
              style={{ marginRight: 10 }}
              onClick={() =>
                setmodalDeletePeriodo({
                  ...modalDeletePeriodo,
                  modal: false,
                  id_periodo: "",
                })
              }
            >
              Cancelar
            </Button>
            <Button
              onClick={deletePeriodo}
              color="success"
              type="submit"
              disabled={loaderDelete}
              variant="contained"
            >
              <LoaderSpinerSubmit isSubmitting={loaderDelete} label="Aceptar" />
            </Button>
          </Grid>
        </Grid>
      </ModalGeneral>
      <ModalGeneral
        key={"modal-activar-periodo"}
        title="Activar Periodo"
        open={modalActivarPeriodo.modal}
        handleClose={() =>
          setmodalActivarPeriodo({ modal: false, periodo: 0, year: 0 })
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            ¿Estás seguro que deseas activar este periodo?
          </Grid>
          <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
            <Button
              color="error"
              variant="contained"
              style={{ marginRight: 10 }}
              onClick={() =>
                setmodalActivarPeriodo({
                  modal: false,
                  periodo: 0,
                  year: 0,
                })
              }
            >
              Cancelar
            </Button>
            <Button
              onClick={activarPeriodo}
              color="success"
              type="submit"
              disabled={loaderActivate}
              variant="contained"
            >
              <LoaderSpinerSubmit
                isSubmitting={loaderActivate}
                label="Aceptar"
              />
            </Button>
          </Grid>
        </Grid>
      </ModalGeneral>
    </>
  );
};
