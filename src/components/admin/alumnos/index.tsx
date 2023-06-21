import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Grid, TextField } from "@mui/material";
import useMediaQueryUpHook from "src/hooks/useMediaQuery";
import { AdminService } from "src/services/admin/admin.service";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/state/reducer";
import { DataGrid, esES, GridColDef, GridToolbar } from "@mui/x-data-grid";
import DataGridTESI from "src/components/DataGridTESI";
import ModalGeneral from "src/components/modalGeneral";
import { setSnackbar } from "src/state/ducks/snackbar";
import { errorsHandle } from "src/helpers/errorsHandle";
import LoaderSpinerSubmit from "src/components/isLoadingSpinner";

const AlumnosTable = () => {
  const isMd = useMediaQueryUpHook("md");
  const adminData = useSelector((state: AppState) => state.admin.data);
  const dispatch = useDispatch();
  const [dataAlumnosArray, setdataAlumnosArray] = useState([]);
  const [modalDeleteAlumno, setmodalDeleteAlumno] = useState({
    modal: false,
    id_alumno: 0,
  });
  const [modalEditAlumno, setmodalEditAlumno] = useState({
    modal: false,
    name: "",
    id: 0,
    lastname: "",
    email: "",
    matricula: "",
  });
  const [editAlumnoData, seteditAlumnoData] = useState({
    name: "",
    lastname: "",
    email: "",
    matricula: "",
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
      field: "matricula",
      headerName: "Matrícula",
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
            setmodalEditAlumno({
              ...modalEditAlumno,
              modal: true,
              email: e.row.email,
              id: e.row.id,
              matricula: e.row.matricula,
              lastname: e.row.lastname,
              name: e.row.name,
            });
            seteditAlumnoData({
              email: e.row.email,
              matricula: e.row.matricula,
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
            setmodalDeleteAlumno({
              ...modalDeleteAlumno,
              modal: true,
              id_alumno: e.row.id,
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

  const getAlumnos = async () => {
    const service = new AdminService();
    try {
      const response = await service.getAllAlumnos({
        id_admin: adminData.id,
      });
      setdataAlumnosArray(response.alumnos);
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
    }
  };

  useEffect(() => {
    getAlumnos();
  }, []);

  const closeDeleteModal = () => {
    setmodalDeleteAlumno({ modal: false, id_alumno: 0 });
  };

  const closeEditModal = () => {
    setmodalEditAlumno({
      modal: false,
      id: 0,
      email: "",
      lastname: "",
      matricula: "",
      name: "",
    });
  };

  const deleteAlumno = async () => {
    setloaderDelete(true);
    const service = new AdminService();
    try {
      await service.deleteAlumno({
        id_admin: adminData.id,
        id_alumno: modalDeleteAlumno.id_alumno,
      });
      closeDeleteModal();
      getAlumnos();
      dispatch(setSnackbar(true, "success", "Alumno eliminado."));
      setloaderDelete(false);
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
      setloaderDelete(false);
    }
  };

  const editAlumno = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setloaderEdit(true);
    const service = new AdminService();
    try {
      let requestData: { [k: string]: any } = {};
      if (editAlumnoData.email !== modalEditAlumno.email) {
        requestData.email = editAlumnoData.email;
      }
      if (editAlumnoData.matricula !== modalEditAlumno.matricula) {
        requestData.matricula = editAlumnoData.matricula;
      }
      if (editAlumnoData.lastname !== modalEditAlumno.lastname) {
        requestData.lastname = editAlumnoData.lastname;
      }
      if (editAlumnoData.name !== modalEditAlumno.name) {
        requestData.name = editAlumnoData.name;
      }
      const areThereChanges = Object.keys(requestData).length >= 1;
      if (areThereChanges) {
        await service.updateAlumno({
          id_admin: adminData.id,
          id_alumno: modalEditAlumno.id,
          ...requestData,
        });
        closeEditModal();
        getAlumnos();
        dispatch(setSnackbar(true, "success", "Alumno actualizado."));
      } else {
        dispatch(setSnackbar(true, "success", "No hay cambios que realizar."));
      }
      setloaderEdit(false);
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
      setloaderEdit(false);
    }
  };

  const handleChangeEditData = (e: { target: { name: any; value: any } }) => {
    seteditAlumnoData({ ...editAlumnoData, [e.target.name]: e.target.value });
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
                  Alumnos
                </Box>
              </Grid>
              <Grid item xs={12}>
                <DataGridTESI
                  columns={columns}
                  rows={dataAlumnosArray}
                  key={"alumnosTable"}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <ModalGeneral
        key={"modal-eliminar-alumno"}
        title="Eliminar Alumno"
        open={modalDeleteAlumno.modal}
        handleClose={closeDeleteModal}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            ¿Estás seguro que deseas eliminar a este alumno?
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
              onClick={deleteAlumno}
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
        key={"modal-editar-alumno"}
        title="Editar Alumno"
        open={modalEditAlumno.modal}
        handleClose={closeEditModal}
      >
        <Grid component="form" onSubmit={editAlumno} container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  value={editAlumnoData.name}
                  label="Nombre(s)"
                  name="name"
                  onChange={handleChangeEditData}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  value={editAlumnoData.lastname}
                  label="Apellido(s)"
                  name="lastname"
                  onChange={handleChangeEditData}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  type={"email"}
                  value={editAlumnoData.email}
                  label="Correo"
                  name="email"
                  onChange={handleChangeEditData}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  value={editAlumnoData.matricula}
                  label="Matricula"
                  name="matricula"
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
              onClick={editAlumno}
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

export default AlumnosTable;
