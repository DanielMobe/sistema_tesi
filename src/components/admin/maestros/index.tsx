import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import useMediaQueryUpHook from "src/hooks/useMediaQuery";
import { AdminService } from "src/services/admin/admin.service";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/state/reducer";
import { GridColDef } from "@mui/x-data-grid";
import DataGridTESI from "src/components/DataGridTESI";
import ModalGeneral from "src/components/modalGeneral";
import { setSnackbar } from "src/state/ducks/snackbar";
import { errorsHandle } from "src/helpers/errorsHandle";
import LoaderSpinerSubmit from "src/components/isLoadingSpinner";

const MaestrosTable = () => {
  const isMd = useMediaQueryUpHook("md");
  const adminData = useSelector((state: AppState) => state.admin.data);
  const dispatch = useDispatch();
  const [dataMaestrosArray, setdataMaestrosArray] = useState([]);
  const [modalDeleteMaestro, setmodalDeleteMaestro] = useState({
    modal: false,
    id_maestro: 0,
  });
  const [modalEditMaestro, setmodalEditMaestro] = useState({
    modal: false,
    id_maestro: 0,
    name: "",
    lastname: "",
    email: "",
    identificador: "",
  });
  const [editMaestroData, seteditMaestroData] = useState({
    name: "",
    lastname: "",
    email: "",
    identificador: "",
  });
  const [loaderEdit, setloaderEdit] = useState(false);
  const [loaderDelete, setloaderDelete] = useState(false);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nombre (s)",
      disableColumnMenu: true,
      flex: isMd ? 1 : 0,
    },
    {
      field: "lastname",
      headerName: "Apellido (s)",
      disableColumnMenu: true,
      flex: isMd ? 1 : 0,
    },
    {
      field: "identificador",
      headerName: "Identificador",
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
            setmodalEditMaestro({
              ...modalEditMaestro,
              modal: true,
              email: e.row.email,
              id_maestro: e.row.id,
              identificador: e.row.identificador,
              lastname: e.row.lastname,
              name: e.row.name,
            });
            seteditMaestroData({
              email: e.row.email,
              identificador: e.row.identificador,
              lastname: e.row.lastname,
              name: e.row.name,
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
            setmodalDeleteMaestro({
              ...modalDeleteMaestro,
              modal: true,
              id_maestro: e.row.id,
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

  const getMaestros = async () => {
    const service = new AdminService();
    try {
      const response = await service.getAllMaestros({
        id_admin: adminData.id,
      });
      setdataMaestrosArray(response.maestros);
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
    }
  };

  const closeModalDelete = () => {
    setmodalDeleteMaestro({ modal: false, id_maestro: 0 });
  };

  const deleteMaestro = async () => {
    setloaderDelete(true);
    const service = new AdminService();
    try {
      await service.deleteMaestro({
        id_admin: adminData.id,
        id_maestro: modalDeleteMaestro.id_maestro,
      });
      closeModalDelete();
      getMaestros();
      dispatch(setSnackbar(true, "success", "Maestro eliminado."));
      setloaderDelete(false);
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
      setloaderDelete(false);
    }
  };

  const editMaestro = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setloaderEdit(true);
    const service = new AdminService();
    try {
      let requestData: { [k: string]: any } = {};
      if (editMaestroData.email !== modalEditMaestro.email) {
        requestData.email = editMaestroData.email;
      }
      if (editMaestroData.identificador !== modalEditMaestro.identificador) {
        requestData.identificador = editMaestroData.identificador;
      }
      if (editMaestroData.lastname !== modalEditMaestro.lastname) {
        requestData.lastname = editMaestroData.lastname;
      }
      if (editMaestroData.name !== modalEditMaestro.name) {
        requestData.name = editMaestroData.name;
      }
      const areThereChanges = Object.keys(requestData).length >= 1;
      if (areThereChanges) {
        await service.updateMaestro({
          id_admin: adminData.id,
          id_maestro: modalEditMaestro.id_maestro,
          ...requestData,
        });
        closeModalEdit();
        getMaestros();
        dispatch(setSnackbar(true, "success", "Maestro actualizado."));
      } else {
        dispatch(setSnackbar(true, "success", "No hay cambios que realizar."));
      }
      setloaderEdit(false);
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
      setloaderEdit(false);
    }
  };

  const closeModalEdit = () => {
    setmodalEditMaestro({
      modal: false,
      id_maestro: 0,
      email: "",
      identificador: "",
      lastname: "",
      name: "",
    });
    seteditMaestroData({
      email: "",
      identificador: "",
      lastname: "",
      name: "",
    });
  };

  useEffect(() => {
    getMaestros();
  }, []);

  const handleChangeEditData = (e: {
    target: { name: string; value: string };
  }) => {
    seteditMaestroData({ ...editMaestroData, [e.target.name]: e.target.value });
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
                  Maestros
                </Box>
              </Grid>
              <Grid item xs={12}>
                <DataGridTESI
                  columns={columns}
                  rows={dataMaestrosArray}
                  key={"maestrosTable"}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <ModalGeneral
        key={"modal-eliminar-maestro"}
        title="Eliminar Maestro"
        open={modalDeleteMaestro.modal}
        handleClose={closeModalDelete}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            ¿Estás seguro que deseas eliminar a este profesor?
          </Grid>
          <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
            <Button
              color="error"
              variant="contained"
              style={{ marginRight: 10 }}
              onClick={closeModalDelete}
            >
              Cancelar
            </Button>
            <Button
              onClick={deleteMaestro}
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
        key={"modal-editar-maestro"}
        title="Editar Maestro"
        open={modalEditMaestro.modal}
        handleClose={closeModalEdit}
      >
        <Grid component="form" onSubmit={editMaestro} container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  value={editMaestroData.name}
                  label="Nombre(s)"
                  name="name"
                  onChange={handleChangeEditData}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  value={editMaestroData.lastname}
                  label="Apellido(s)"
                  name="lastname"
                  onChange={handleChangeEditData}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  type={"email"}
                  value={editMaestroData.email}
                  label="Correo"
                  name="email"
                  onChange={handleChangeEditData}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  value={editMaestroData.identificador}
                  label="Identificador"
                  name="identificador"
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
              onClick={closeModalEdit}
            >
              Cancelar
            </Button>
            <Button
              onClick={editMaestro}
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

export default MaestrosTable;
