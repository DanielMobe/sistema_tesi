import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import useMediaQueryUpHook from "src/hooks/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/state/reducer";
import { AdminService } from "src/services/admin/admin.service";
import { GridColDef } from "@mui/x-data-grid";
import DataGridTESI from "src/components/DataGridTESI";
import ModalGeneral from "src/components/modalGeneral";
import { setSnackbar } from "src/state/ducks/snackbar";
import { errorsHandle } from "src/helpers/errorsHandle";
import LoaderSpinerSubmit from "src/components/isLoadingSpinner";

const MateriasTable = () => {
  const isMd = useMediaQueryUpHook("md");
  const adminData = useSelector((state: AppState) => state.admin.data);
  const dispatch = useDispatch();
  const [dataMateriasArray, setdataMateriasArray] = useState([]);
  const [modalDeleteMaterias, setmodalDeleteMaterias] = useState({
    modal: false,
    id_materia: 0,
  });
  const [modalEditMaterias, setmodalEditMaterias] = useState({
    modal: false,
    id: 0,
    cred: 0,
    id_materia: "",
    nombre: "",
  });
  const [editMateriasData, seteditMateriasData] = useState({
    nombre: "",
    id_materia: "",
    cred: 0,
  });
  const [loaderEdit, setloaderEdit] = useState(false);
  const [loaderDelete, setloaderDelete] = useState(false);

  const columns: GridColDef[] = [
    {
      field: "id_materia",
      headerName: "Id Materia",
      disableColumnMenu: true,
      flex: isMd ? 1 : 0,
    },
    {
      field: "nombre",
      headerName: "Nombre Materia",
      disableColumnMenu: true,
      align: "center",
      flex: isMd ? 1 : 0,
    },
    {
      field: "cred",
      headerName: "Creditos",
      disableColumnMenu: true,
      align: "center",
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
            setmodalEditMaterias({
              ...modalEditMaterias,
              modal: true,
              id: e.row.id,
              cred: e.row.cred,
              id_materia: e.row.id_materia,
              nombre: e.row.nombre,
            });
            seteditMateriasData({
              cred: e.row.cred,
              id_materia: e.row.id_materia,
              nombre: e.row.nombre,
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
            setmodalDeleteMaterias({
              ...modalDeleteMaterias,
              modal: true,
              id_materia: e.row.id_materia,
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

  const getMaterias = async () => {
    const service = new AdminService();
    try {
      const response = await service.getAllMaterias({ id_admin: adminData.id });
      setdataMateriasArray(response.materia);
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
    }
  };

  useEffect(() => {
    getMaterias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeDeleteModal = () => {
    setmodalDeleteMaterias({ modal: false, id_materia: 0 });
  };

  const closeEditModal = () => {
    setmodalEditMaterias({
      modal: false,
      cred: 0,
      id: 0,
      id_materia: "",
      nombre: "",
    });
    seteditMateriasData({
      cred: 0,
      id_materia: "",
      nombre: "",
    });
  };

  const deleteMateria = async () => {
    setloaderDelete(true);
    const service = new AdminService();
    try {
      await service.deleteMateria({
        id_admin: adminData.id,
        id_materia: modalDeleteMaterias.id_materia,
      });
      closeDeleteModal();
      getMaterias();
      dispatch(
        setSnackbar(true, "success", "Materia eliminada correctamente.")
      );
      setloaderDelete(false);
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
      setloaderDelete(false);
    }
  };

  const editMateria = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setloaderEdit(true);
    const service = new AdminService();
    try {
      let requestData: { [k: string]: any } = {};
      if (editMateriasData.cred !== modalEditMaterias.cred) {
        requestData.cred = editMateriasData.cred;
      }
      if (editMateriasData.nombre !== modalEditMaterias.nombre) {
        requestData.nombre = editMateriasData.nombre;
      }
      const areThereChanges = Object.keys(requestData).length >= 1;
      if (areThereChanges) {
        await service.updateMateria({
          id_admin: adminData.id,
          id_materia: +modalEditMaterias.id_materia,
          ...requestData,
        });
        closeEditModal();
        getMaterias();
        dispatch(setSnackbar(true, "success", "Materia actualizada."));
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
    seteditMateriasData({
      ...editMateriasData,
      [e.target.name]: e.target.value,
    });
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
                  Materias
                </Box>
              </Grid>
              <Grid item xs={12}>
                <DataGridTESI
                  columns={columns}
                  rows={dataMateriasArray}
                  key={"materiasTable"}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <ModalGeneral
        key={"modal-eliminar-materia"}
        title="Eliminar Materia"
        open={modalDeleteMaterias.modal}
        handleClose={closeDeleteModal}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            ¿Estás seguro que deseas eliminar esta materia?
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
              onClick={deleteMateria}
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
        key={"modal-editar-materia"}
        title="Editar Materia"
        open={modalEditMaterias.modal}
        handleClose={closeEditModal}
      >
        <Grid component="form" onSubmit={editMateria} container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  value={editMateriasData.nombre}
                  label="Nombre"
                  name="nombre"
                  onChange={handleChangeEditData}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  value={editMateriasData.id_materia}
                  label="Id Materia"
                  name="id_materia"
                  onChange={handleChangeEditData}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  value={editMateriasData.cred}
                  label="Creditos"
                  name="cred"
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
              onClick={editMateria}
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

export default MateriasTable;
