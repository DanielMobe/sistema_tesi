import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import useMediaQueryUpHook from "src/hooks/useMediaQuery";
import { AdminService } from "src/services/admin/admin.service";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/state/reducer";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DataGridTESI from "src/components/DataGridTESI";
import { setSnackbar } from "src/state/ducks/snackbar";
import ModalGeneral from "src/components/modalGeneral";
import { errorsHandle } from "src/helpers/errorsHandle";
import LoaderSpinerSubmit from "src/components/isLoadingSpinner";

const CarrerasTable = () => {
  const isMd = useMediaQueryUpHook("md");
  const dispatch = useDispatch();
  const adminData = useSelector((state: AppState) => state.admin.data);
  const [dataCarrerasArray, setdataCarrerasArray] = useState([]);
  const [modalDeleteCarrera, setmodalDeleteCarrera] = useState({
    modal: false,
    id_carrera: 0,
  });
  const [modalEditCarrera, setmodalEditCarrera] = useState({
    modal: false,
    carrera: "",
    id_carrera: 0,
  });
  const [editCarreraData, seteditCarreraData] = useState({ carrera: "" });
  const [loaderEdit, setloaderEdit] = useState(false);
  const [loaderDelete, setloaderDelete] = useState(false);
  const [loaderTable, setloaderTable] = useState(false);

  const columns: GridColDef[] = [
    {
      field: "id_carrera",
      headerName: "Id Carrera",
      disableColumnMenu: true,
      flex: isMd ? 1 : 0,
    },
    {
      field: "carrera",
      headerName: "Nombre Carrera",
      disableColumnMenu: true,
      flex: isMd ? 1 : 0,
    },
    {
      field: "no_carrera",
      headerName: "Número de Carrera",
      disableColumnMenu: true,
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
          onClick={() => {
            setmodalEditCarrera({
              ...modalEditCarrera,
              modal: true,
              carrera: e.row.carrera,
              id_carrera: e.row.id_carrera,
            });
            seteditCarreraData({
              carrera: e.row.carrera,
            });
          }}
          style={{ textTransform: "capitalize" }}
          variant="contained"
          color="success"
        >
          Editar
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
          onClick={() => {
            setmodalDeleteCarrera({
              ...modalDeleteCarrera,
              modal: true,
              id_carrera: e.row.id_carrera,
            });
          }}
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

  const validateWidth = () => {
    let widthvalidated = "100%";

    if (isMd) {
      // widthvalidated = "50%";
    }

    return widthvalidated;
  };

  const getCarreras = async () => {
    setloaderTable(true);
    const service = new AdminService();
    try {
      const response = await service.getAllCarreras({ id_admin: adminData.id });
      const responseFiltered = response.carrera.map(
        (obj: { id_carrera: any }) => ({
          ...obj,
          id: `${obj.id_carrera}carrera`,
        })
      );
      setdataCarrerasArray(responseFiltered);
      setloaderTable(false);
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
      setloaderTable(false);
    }
  };

  useEffect(() => {
    getCarreras();
  }, []);

  const closeEditModal = () => {
    setmodalEditCarrera({ modal: false, carrera: "", id_carrera: 0 });
  };

  const closeDeleteModal = () => {
    setmodalDeleteCarrera({ modal: false, id_carrera: 0 });
  };

  const deleteCarrera = async () => {
    setloaderDelete(true);
    const service = new AdminService();
    try {
      await service.deleteCarrera({
        id_admin: adminData.id,
        id_carrera: modalDeleteCarrera.id_carrera,
      });
      closeDeleteModal();
      getCarreras();
      dispatch(
        setSnackbar(true, "success", "Carrera eliminada correctamente.")
      );
      setloaderDelete(false);
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
      setloaderDelete(false);
    }
  };

  const editCarrera = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setloaderEdit(true);
    const service = new AdminService();
    try {
      let requestData: { [k: string]: any } = {};
      if (editCarreraData.carrera !== modalEditCarrera.carrera) {
        requestData.carrera = editCarreraData.carrera;
      }
      const areThereChanges = Object.keys(requestData).length >= 1;
      if (areThereChanges) {
        await service.updateCarrera({
          id_admin: adminData.id,
          id_carrera: modalEditCarrera.id_carrera,
          ...requestData,
        });
        closeEditModal();
        getCarreras();
        dispatch(setSnackbar(true, "success", "Carrera actualizada."));
      } else {
        dispatch(setSnackbar(true, "success", "No hay cambios que realizar."));
      }
      setloaderEdit(false);
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
      setloaderEdit(false);
    }
  };

  const handleChangeEditData = (e: any) => {
    seteditCarreraData({ ...editCarreraData, [e.target.name]: e.target.value });
  };

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
              <Grid item xs={12}>
                <Box mb={2} fontWeight={800}>
                  Carreras
                </Box>
              </Grid>
              <Grid item xs={12}>
                <DataGridTESI
                  loader={loaderTable}
                  columns={columns}
                  rows={dataCarrerasArray}
                  key={"carrerasTable"}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <ModalGeneral
        key={"modal-eliminar-carrera"}
        title="Eliminar Carrera"
        open={modalDeleteCarrera.modal}
        handleClose={closeDeleteModal}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            ¿Estás seguro que deseas eliminar esta carrera?
          </Grid>
          <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
            <Button
              color="error"
              variant="contained"
              style={{ marginRight: 10 }}
              onClick={closeDeleteModal}
            >
              Cancelar
            </Button>
            <Button
              onClick={deleteCarrera}
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
        key={"modal-editar-carrera"}
        title="Editar Carrera"
        open={modalEditCarrera.modal}
        handleClose={closeEditModal}
      >
        <Grid component="form" onSubmit={editCarrera} container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={editCarreraData.carrera}
                  label="Carrera"
                  name="carrera"
                  onChange={handleChangeEditData}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
            <Button
              color="error"
              variant="contained"
              style={{ marginRight: 10 }}
              onClick={closeEditModal}
            >
              Cancelar
            </Button>
            <Button
              onClick={editCarrera}
              color="success"
              type="submit"
              disabled={loaderEdit}
              variant="contained"
            >
              <LoaderSpinerSubmit isSubmitting={loaderEdit} label="Editar" />
            </Button>
          </Grid>
        </Grid>
      </ModalGeneral>
    </>
  );
};

export default CarrerasTable;
