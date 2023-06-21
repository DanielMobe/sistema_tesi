import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMediaQueryUpHook from "src/hooks/useMediaQuery";
import validationSchemaDatosComplementarios from "src/schemas/schemaStudentComplementaryDashboard";
import { AppState } from "src/state/reducer";
import {
  studentComplementaryData,
  studentLogout,
} from "src/state/student/student.store.actions";
import InputFormik from "../inputFormik";
import LoaderSpinerSubmit from "../isLoadingSpinner";
import { useHistory } from "react-router-dom";
import { carrerasArray } from "src/constants/carreras";

const StudentFillDataDialog = ({
  open,
  hideDialog,
  title,
}: {
  open: boolean;
  hideDialog: () => void;
  title: string;
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isMd = useMediaQueryUpHook("md");
  const studentData = useSelector((state: AppState) => state.student.data);
  const [carrerasList, setcarrerasList] = useState<
    { carrera: string; id_materia: string }[]
  >([]);

  const handleClick = async (data: any) => {
    await dispatch(
      studentComplementaryData(studentData.id, {
        ...data,
        egreso_bachiller: moment(data.egreso_bachiller).format("YYYY"),
        ingreso_bachiller: moment(data.ingreso_bachiller).format("YYYY"),
        fecha_nacimiento: moment(data.fecha_nacimiento).format("DD-MM-YYYY"),
        fecha_nacimiento_madre: !!data.fecha_nacimiento_madre
          ? moment(data.fecha_nacimiento_madre).format("DD-MM-YYYY")
          : "",
        fecha_nacimiento_padre: !!data.fecha_nacimiento_padre
          ? moment(data.fecha_nacimiento_padre).format("DD-MM-YYYY")
          : "",
      })
    );
  };

  const getCarreras = async () => {
    setcarrerasList(carrerasArray);
  };

  const formikStudent = useFormik({
    initialValues: {
      CURP: "",
      calle: "",
      num_ext: "",
      num_int: "",
      entre_calles: "",
      referencias: "",
      colonia: "",
      municipio: "",
      estado: "",
      CP: "",
      estado_nacimiento: "",
      tel_celular: "",
      tel_casa: "",
      tipo_sangre: "",
      fecha_nacimiento: "",
      years_old: "",
      sexo: "",
      estado_civil: "",

      carrera: "",
      carrera_n: "",

      promedio_bachiller: "",
      escuela_bachiller: "",
      lugar_bachiller: "",
      ingreso_bachiller: "",
      egreso_bachiller: "",
      discapacidad_desc: "",

      fecha_solicitud: "",

      nombre_padre: "",
      fecha_nacimiento_padre: "",
      ocupacion_padre: "",
      ingresos_padre: "",
      tel_padre: "",
      email_padre: "",
      calle_padre: "",
      num_ext_padre: "",
      num_int_padre: "",
      entre_calles_padre: "",
      referencias_padre: "",
      colonia_padre: "",
      municipio_padre: "",
      estado_padre: "",
      CP_padre: "",

      nombre_madre: "",
      fecha_nacimiento_madre: "",
      ocupacion_madre: "",
      ingresos_madre: "",
      tel_madre: "",
      email_madre: "",
      calle_madre: "",
      num_ext_madre: "",
      num_int_madre: "",
      entre_calles_madre: "",
      referencias_madre: "",
      colonia_madre: "",
      municipio_madre: "",
      estado_madre: "",
      CP_madre: "",
    },
    validationSchema: validationSchemaDatosComplementarios(),
    onSubmit: handleClick,
  });

  useEffect(() => {
    getCarreras();
    formikStudent.setFieldValue(
      "fecha_solicitud",
      moment().format("DD-MM-YYYY")
    );
  }, []);

  useEffect(() => {
    if (formikStudent.values.carrera !== "") {
      formikStudent.setFieldValue(
        "carrera_n",
        carrerasList.find(
          (carrera) => carrera.carrera === formikStudent.values.carrera
        )?.id_materia
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formikStudent.values.carrera]);

  const userLogout = async () => {
    if (
      window.confirm("Si no continúas con el registro, se cerrará la sesión")
    ) {
      await dispatch(studentLogout({ id: studentData.id }, history));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={hideDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form onSubmit={formikStudent.handleSubmit}>
        <DialogTitle id="alert-dialog-title">
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Box>{title}</Box>
            <IconButton onClick={userLogout}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="end">
            <Grid container spacing={2}>
              <>
                <Grid item xs={12}>
                  <Divider textAlign="left">
                    <Box fontSize={"1.3rem"}>Datos generales</Box>
                  </Divider>
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar CURP"
                    formik={formikStudent}
                    label="CURP"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    name="CURP"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar calle"
                    formik={formikStudent}
                    label="Calle"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    name="calle"
                  />
                </Grid>
                <Grid item xs={3}>
                  <InputFormik
                    placeholder="Ingresar número exterior"
                    formik={formikStudent}
                    label="No. Ext."
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    name="num_ext"
                  />
                </Grid>
                <Grid item xs={3}>
                  <InputFormik
                    placeholder="Ingresar número interior"
                    formik={formikStudent}
                    label="No. Int."
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="num_int"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar entre calles"
                    formik={formikStudent}
                    label="Entre calles"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    name="entre_calles"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar referencias"
                    inputProps={{ maxLength: 50 }}
                    formik={formikStudent}
                    label="Referencias"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="referencias"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar colonia"
                    formik={formikStudent}
                    label="Colonia"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    name="colonia"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar municipio"
                    formik={formikStudent}
                    label="Municipio"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    name="municipio"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar estado"
                    formik={formikStudent}
                    label="Estado"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    name="estado"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar Codigo Postal"
                    formik={formikStudent}
                    label="CP"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    name="CP"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar estado de nacimiento"
                    formik={formikStudent}
                    label="Estado de nacimiento"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    name="estado_nacimiento"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar telefono celular"
                    inputProps={{ maxLength: 10 }}
                    formik={formikStudent}
                    label="Telefono celular"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    name="tel_celular"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar telefono de casa"
                    inputProps={{ maxLength: 10 }}
                    formik={formikStudent}
                    label="Telefono de casa"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    name="tel_casa"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar tipo de sangre"
                    formik={formikStudent}
                    label="Tipo de sangre"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="tipo_sangre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    formik={formikStudent}
                    label="Fecha de nacimiento"
                    fullWidth
                    required
                    type={"date"}
                    variant="outlined"
                    size="small"
                    name="fecha_nacimiento"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar edad"
                    inputProps={{ maxLength: 2 }}
                    formik={formikStudent}
                    label="Edad"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    name="years_old"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar sexo"
                    formik={formikStudent}
                    label="Sexo"
                    fullWidth
                    required
                    select
                    variant="outlined"
                    size="small"
                    name="sexo"
                  >
                    <MenuItem value="H">H</MenuItem>
                    <MenuItem value="M">M</MenuItem>
                  </InputFormik>
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar estado civil"
                    formik={formikStudent}
                    label="Estado civil"
                    fullWidth
                    required
                    select
                    variant="outlined"
                    size="small"
                    name="estado_civil"
                  >
                    <MenuItem value="Soltero">Soltero</MenuItem>
                    <MenuItem value="Casado">Casado</MenuItem>
                    <MenuItem value="Viudo">Viudo</MenuItem>
                    <MenuItem value="Union libre">Union libre</MenuItem>
                    <MenuItem value="Otro">Otro</MenuItem>
                  </InputFormik>
                </Grid>
              </>
              <>
                <Grid item xs={12}>
                  <Divider textAlign="left">
                    <Box fontSize={"1.3rem"}>Datos carrera</Box>
                  </Divider>
                </Grid>
                <Grid item xs={12}>
                  <InputFormik
                    placeholder="Ingresar carrera"
                    formik={formikStudent}
                    label="Carrera"
                    fullWidth
                    required
                    select
                    variant="outlined"
                    size="small"
                    name="carrera"
                  >
                    {carrerasList.map((carrera) => (
                      <MenuItem value={carrera.carrera} key={carrera.carrera}>
                        {carrera.carrera}
                      </MenuItem>
                    ))}
                  </InputFormik>
                </Grid>
              </>
              <>
                <Grid item xs={12}>
                  <Divider textAlign="left">
                    <Box fontSize={"1.3rem"}>Datos bachiller</Box>
                  </Divider>
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar promedio bachiller"
                    formik={formikStudent}
                    label="Promedio bachiller"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    name="promedio_bachiller"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar escuela bachiller"
                    formik={formikStudent}
                    label="Escuela bachiller"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    name="escuela_bachiller"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar dirección bachiller"
                    formik={formikStudent}
                    label="Dirección bachiller"
                    fullWidth
                    required
                    variant="outlined"
                    size="small"
                    name="lugar_bachiller"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar fecha de ingreso"
                    formik={formikStudent}
                    label="Fecha de ingreso"
                    fullWidth
                    required
                    type={"date"}
                    variant="outlined"
                    size="small"
                    name="ingreso_bachiller"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar fecha de egreso"
                    formik={formikStudent}
                    label="Fecha de egreso"
                    fullWidth
                    required
                    type={"date"}
                    variant="outlined"
                    size="small"
                    name="egreso_bachiller"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Indicar si tiene alguna discapacidad"
                    formik={formikStudent}
                    label="Discapacidad"
                    fullWidth
                    required
                    select
                    variant="outlined"
                    size="small"
                    name="discapacidad_desc"
                  >
                    <MenuItem value={"Si"}>Si</MenuItem>
                    <MenuItem value={"No"}>No</MenuItem>
                  </InputFormik>
                </Grid>
              </>
              <>
                <Grid item xs={12}>
                  <Divider textAlign="left">
                    <Box fontSize={"1.3rem"}>Datos Padre</Box>
                  </Divider>
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar nombre"
                    formik={formikStudent}
                    label="Nombre"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="nombre_padre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar fecha nacimiento"
                    formik={formikStudent}
                    label="Fecha nacimiento"
                    fullWidth
                    type={"date"}
                    variant="outlined"
                    size="small"
                    name="fecha_nacimiento_padre"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar ocupación"
                    formik={formikStudent}
                    label="Ocupación"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="ocupacion_padre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar ingresos"
                    formik={formikStudent}
                    label="Ingresos"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="ingresos_padre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar telefono"
                    formik={formikStudent}
                    label="Telefono"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="tel_padre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar correo"
                    formik={formikStudent}
                    label="Correo"
                    fullWidth
                    type={"email"}
                    variant="outlined"
                    size="small"
                    name="email_padre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar calle"
                    formik={formikStudent}
                    label="Calle"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="calle_padre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar número exterior"
                    formik={formikStudent}
                    label="No. Ext."
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="num_ext_padre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar número interior"
                    formik={formikStudent}
                    label="No. Int."
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="num_int_padre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar entre calles"
                    formik={formikStudent}
                    label="Entre calles"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="entre_calles_padre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar referencias"
                    inputProps={{ maxLength: 50 }}
                    formik={formikStudent}
                    label="Referencias"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="referencias_padre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar colonia"
                    formik={formikStudent}
                    label="Colonia"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="colonia_padre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar municipio"
                    formik={formikStudent}
                    label="Municipio"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="municipio_padre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar estado"
                    formik={formikStudent}
                    label="Estado"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="estado_padre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar código postal"
                    formik={formikStudent}
                    label="CP"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="CP_padre"
                  />
                </Grid>
              </>
              <>
                <Grid item xs={12}>
                  <Divider textAlign="left">
                    <Box fontSize={"1.3rem"}>Datos Madre</Box>
                  </Divider>
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar nombre"
                    formik={formikStudent}
                    label="Nombre"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="nombre_madre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar fecha nacimiento"
                    formik={formikStudent}
                    label="Fecha nacimiento"
                    fullWidth
                    type={"date"}
                    variant="outlined"
                    size="small"
                    name="fecha_nacimiento_madre"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar ocupación"
                    formik={formikStudent}
                    label="Ocupación"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="ocupacion_madre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar ingresos"
                    formik={formikStudent}
                    label="Ingresos"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="ingresos_madre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar telefono"
                    formik={formikStudent}
                    label="Telefono"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="tel_madre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar correo"
                    formik={formikStudent}
                    label="Correo"
                    fullWidth
                    type={"email"}
                    variant="outlined"
                    size="small"
                    name="email_madre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar calle"
                    formik={formikStudent}
                    label="Calle"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="calle_madre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar número exterior"
                    formik={formikStudent}
                    label="No. Ext."
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="num_ext_madre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar número interior"
                    formik={formikStudent}
                    label="No. Int."
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="num_int_madre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar entre calles"
                    formik={formikStudent}
                    label="Entre calles"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="entre_calles_madre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar referencias"
                    inputProps={{ maxLength: 50 }}
                    formik={formikStudent}
                    label="Referencias"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="referencias_madre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar colonia"
                    formik={formikStudent}
                    label="Colonia"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="colonia_madre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar municipio"
                    formik={formikStudent}
                    label="Municipio"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="municipio_madre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar estado"
                    formik={formikStudent}
                    label="Estado"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="estado_madre"
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputFormik
                    placeholder="Ingresar código postal"
                    formik={formikStudent}
                    label="CP"
                    fullWidth
                    variant="outlined"
                    size="small"
                    name="CP_madre"
                  />
                </Grid>
              </>
            </Grid>
            {/* <Box
              marginTop="1rem"
              width="100%"
              display="flex"
              justifyContent="end"
            >
              <Button
                variant="contained"
                color="success"
                type="submit"
                disabled={formikStudent.isSubmitting}
                style={{ textTransform: "capitalize" }}
              >
                <LoaderSpinerSubmit
                  isSubmitting={formikStudent.isSubmitting}
                  label="Guardar"
                />
              </Button>
            </Box> */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="success"
            type="submit"
            disabled={formikStudent.isSubmitting}
            style={{ textTransform: "capitalize" }}
          >
            <LoaderSpinerSubmit
              isSubmitting={formikStudent.isSubmitting}
              label="Guardar"
            />
          </Button>
          {/* <Button onClick={handleClick} autoFocus>
          Aceptar
        </Button> */}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StudentFillDataDialog;
