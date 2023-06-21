import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useFormik } from "formik";
import validationSchemaTeacher from "../../schemas/schemaTeacher";
import useMediaQueryUpHook from "src/hooks/useMediaQuery";
import {
  loginTeacher,
  signinTeacher,
} from "src/state/teacher/teacher.store.actions";
import { SigninTeacherData } from "src/state/teacher/teacher.store.types";
import validationSchemaStudent from "../../schemas/schemaStudent";
import { SigninStudentData } from "src/services/student/student.service.types";
import {
  loginStudent,
  signinStudent,
} from "src/state/student/student.store.actions";
import validationSchemaLogin from "src/schemas/schemaLogin";
import { LoginData } from "src/types/login.types";
// import { StudentService } from "src/services/student/student.service";
// import { TeacherService } from "src/services/teacher/teacher.service";
import { useDispatch } from "react-redux";
import LoaderSpinerSubmit from "src/components/isLoadingSpinner";

const useStyles = makeStyles({
  rootCard: {
    padding: "1rem 3rem",
  },
});

export const Home: React.FC: React.FC = () => {
  const location = useLocation();
  const location = useLocation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useHistory();
  const isMd = useMediaQueryUpHook("md");

  // return true if docente is in pathname
  const validatePathName = () => {
    let validation = location.pathname.includes("docente");
    return validation;
  };

  const validateSignIn = () => {
    let validation = location.pathname.includes("registro");
    return validation;
  };

  const redirectSignin = () => {
    let path = "/alumno/registro";
    if (validatePathName()) {
      path = "/docente/registro";
    }
    router.push(path);
  };

  const title = () => {
    let action = "Acceso";
    let rol = "Alumnado";
    if (validateSignIn()) {
      action = "Registro";
    }
    if (validatePathName()) {
      rol = "Docente";
    }
    return `${action} ${rol}`;
  };

  const back = () => {
    let backPath = "/";
    if (validateSignIn()) {
      if (validatePathName()) {
        backPath = "/docente/acceso";
      } else {
        backPath = "/alumno/acceso";
      }
    }
    router.push(backPath);
  };

  const signInDocente = (data: SigninTeacherData) => {
    dispatch(signinTeacher(data, router));
  };

  const formikTeacher = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      repassword: "",
      identificador: "",
    },
    validationSchema: validationSchemaTeacher(),
    onSubmit: signInDocente,
  });

  const signInAlumno = async (
    data: SigninStudentData & { repassword: string }
  ) => {
    let { repassword, ...filteredData } = data;
    await dispatch(signinStudent(filteredData, router));
    formikStudent.setSubmitting(false);
  };

  const formikStudent = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      repassword: "",
      matricula: "",
    },
    validationSchema: validationSchemaStudent(),
    onSubmit: signInAlumno,
  });

  const validateWidth = () => {
    let widthvalidated = "100%";

    if (isMd) {
      if (validateSignIn()) {
        widthvalidated = "35%";
      } else {
        widthvalidated = "25%";
      }
    }

    return widthvalidated;
  };

  const loginSubmit = async (data: LoginData) => {
    if (validatePathName()) {
      await dispatch(loginTeacher(data, router));
      formikLogin.setSubmitting(false);
    } else {
      await dispatch(loginStudent(data, router));
      formikLogin.setSubmitting(false);
    }
  };

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchemaLogin(),
    onSubmit: loginSubmit,
  });

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchemaLogin(),
    onSubmit: loginSubmit,
  });

  return (
    <Card style={{ borderRadius: "3px", width: validateWidth() }}>
      <Box display="flex" alignItems="center" px={4} pt={3}>
        <Box mr="0.3rem">
          <IconButton size="small" onClick={back}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Typography>
          <Box fontWeight={1000}>{title()}</Box>
        </Typography>
      </Box>
      <CardContent className={classes.rootCard}>
        <Box display="flex" flexDirection="column" alignItems="end">
          {!validateSignIn() ? (
            <form onSubmit={formikLogin.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Ingresar usuario"
                    fullWidth
                    label="Usuario"
                    required
                    variant="outlined"
                    size="small"
                    name="email"
                    type="email"
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    value={formikLogin.values.email}
                    error={
                      formikLogin.touched.email &&
                      Boolean(formikLogin.errors.email)
                    }
                    helperText={
                      formikLogin.touched.email && formikLogin.errors.email
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    placeholder="Ingresar contraseña"
                    fullWidth
                    label="Contraseña"
                    required
                    type="password"
                    variant="outlined"
                    size="small"
                    name="password"
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    value={formikLogin.values.password}
                    error={
                      formikLogin.touched.password &&
                      Boolean(formikLogin.errors.password)
                    }
                    helperText={
                      formikLogin.touched.password &&
                      formikLogin.errors.password
                    }
                  />
                </Grid>
              </Grid>
              <Box
                marginTop="1rem"
                width="100%"
                display="flex"
                justifyContent="space-between"
              >
                {!validatePathName() && (
                  <Button
                    onClick={redirectSignin}
                    variant="text"
                    color="success"
                    style={{ textTransform: "capitalize" }}
                  >
                    Registro
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="success"
                  disabled={formikLogin.isSubmitting}
                  type="submit"
                  style={{ textTransform: "capitalize" }}
                >
                  <LoaderSpinerSubmit
                    isSubmitting={formikLogin.isSubmitting}
                    label="Iniciar sesión"
                  />
                </Button>
              </Box>
              <Box
                marginTop="1rem"
                width="100%"
                display="flex"
                justifyContent="end"
              >
                <Button
                  onClick={() => router.push("/docente/recuperar-password")}
                  variant="text"
                  color="success"
                  style={{ textTransform: "capitalize" }}
                >
                  ¿Olvidaste tu contraseña?
                </Button>
              </Box>
            </form>
          ) : (
            <>
              {/* True docente */}
              {validatePathName() ? (
                <form onSubmit={formikTeacher.handleSubmit}>
                  <Grid component="form" container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        placeholder="Ingresar nombre(s)"
                        fullWidth
                        label="Nombre(s)"
                        required
                        variant="outlined"
                        size="small"
                        id="name"
                        name="name"
                        onChange={formikTeacher.handleChange}
                        onBlur={formikTeacher.handleBlur}
                        value={formikTeacher.values.name}
                        error={
                          formikTeacher.touched.name &&
                          Boolean(formikTeacher.errors.name)
                        }
                        helperText={
                          formikTeacher.touched.name &&
                          formikTeacher.errors.name
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        placeholder="Ingresar apellido(s)"
                        fullWidth
                        label="Apellido(s)"
                        required
                        variant="outlined"
                        size="small"
                        name="lastname"
                        onChange={formikTeacher.handleChange}
                        onBlur={formikTeacher.handleBlur}
                        value={formikTeacher.values.lastname}
                        error={
                          formikTeacher.touched.lastname &&
                          Boolean(formikTeacher.errors.lastname)
                        }
                        helperText={
                          formikTeacher.touched.lastname &&
                          formikTeacher.errors.lastname
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        placeholder="Ingresar correo electrónico"
                        fullWidth
                        label="Correo"
                        required
                        type="email"
                        variant="outlined"
                        size="small"
                        name="email"
                        onChange={formikTeacher.handleChange}
                        onBlur={formikTeacher.handleBlur}
                        value={formikTeacher.values.email}
                        error={
                          formikTeacher.touched.email &&
                          Boolean(formikTeacher.errors.email)
                        }
                        helperText={
                          formikTeacher.touched.email &&
                          formikTeacher.errors.email
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        placeholder="Ingresar identificador"
                        fullWidth
                        label="Identificador"
                        variant="outlined"
                        size="small"
                        name="identificador"
                        onChange={formikTeacher.handleChange}
                        onBlur={formikTeacher.handleBlur}
                        value={formikTeacher.values.identificador}
                        error={
                          formikTeacher.touched.identificador &&
                          Boolean(formikTeacher.errors.identificador)
                        }
                        helperText={
                          formikTeacher.touched.identificador &&
                          formikTeacher.errors.identificador
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        placeholder="Ingresar contraseña"
                        fullWidth
                        label="Contraseña"
                        required
                        type="password"
                        variant="outlined"
                        size="small"
                        name="password"
                        onChange={formikTeacher.handleChange}
                        onBlur={formikTeacher.handleBlur}
                        value={formikTeacher.values.password}
                        error={
                          formikTeacher.touched.password &&
                          Boolean(formikTeacher.errors.password)
                        }
                        helperText={
                          formikTeacher.touched.password &&
                          formikTeacher.errors.password
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        placeholder="Verificar contraseña"
                        fullWidth
                        label="Verificar contraseña"
                        required
                        type="password"
                        variant="outlined"
                        size="small"
                        name="repassword"
                        onChange={formikTeacher.handleChange}
                        onBlur={formikTeacher.handleBlur}
                        value={formikTeacher.values.repassword}
                        error={
                          formikTeacher.touched.repassword &&
                          Boolean(formikTeacher.errors.repassword)
                        }
                        helperText={
                          formikTeacher.touched.repassword &&
                          formikTeacher.errors.repassword
                        }
                      />
                    </Grid>
                  </Grid>
                  <Box
                    marginTop="1rem"
                    width="100%"
                    display="flex"
                    justifyContent="end"
                  >
                    <Button
                      variant="contained"
                      color="success"
                      type="submit"
                      // onClick={() => formikTeacher.handleSubmit()}
                      style={{ textTransform: "capitalize" }}
                    >
                      Registrar Docente
                    </Button>
                  </Box>
                </form>
              ) : (
                <form onSubmit={formikStudent.handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        placeholder="Ingresar nombre(s)"
                        fullWidth
                        label="Nombre(s)"
                        required
                        variant="outlined"
                        size="small"
                        name="name"
                        onChange={formikStudent.handleChange}
                        onBlur={formikStudent.handleBlur}
                        value={formikStudent.values.name}
                        error={
                          formikStudent.touched.name &&
                          Boolean(formikStudent.errors.name)
                        }
                        helperText={
                          formikStudent.touched.name &&
                          formikStudent.errors.name
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        placeholder="Ingresar apellido(s)"
                        fullWidth
                        label="Apellido(s)"
                        required
                        variant="outlined"
                        size="small"
                        name="lastname"
                        onChange={formikStudent.handleChange}
                        onBlur={formikStudent.handleBlur}
                        value={formikStudent.values.lastname}
                        error={
                          formikStudent.touched.lastname &&
                          Boolean(formikStudent.errors.lastname)
                        }
                        helperText={
                          formikStudent.touched.lastname &&
                          formikStudent.errors.lastname
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        placeholder="Ingresar correo electrónico"
                        fullWidth
                        label="Correo"
                        required
                        type="email"
                        variant="outlined"
                        size="small"
                        name="email"
                        onChange={formikStudent.handleChange}
                        onBlur={formikStudent.handleBlur}
                        value={formikStudent.values.email}
                        error={
                          formikStudent.touched.email &&
                          Boolean(formikStudent.errors.email)
                        }
                        helperText={
                          formikStudent.touched.email &&
                          formikStudent.errors.email
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        placeholder="Ingresar matrícula"
                        fullWidth
                        label="Matrícula"
                        required
                        variant="outlined"
                        size="small"
                        name="matricula"
                        onChange={formikStudent.handleChange}
                        onBlur={formikStudent.handleBlur}
                        value={formikStudent.values.matricula}
                        error={
                          formikStudent.touched.matricula &&
                          Boolean(formikStudent.errors.matricula)
                        }
                        helperText={
                          formikStudent.touched.matricula &&
                          formikStudent.errors.matricula
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        placeholder="Ingresar contraseña"
                        fullWidth
                        label="Contraseña"
                        required
                        type="password"
                        variant="outlined"
                        size="small"
                        name="password"
                        onChange={formikStudent.handleChange}
                        onBlur={formikStudent.handleBlur}
                        value={formikStudent.values.password}
                        error={
                          formikStudent.touched.password &&
                          Boolean(formikStudent.errors.password)
                        }
                        helperText={
                          formikStudent.touched.password &&
                          formikStudent.errors.password
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        placeholder="Verificar contraseña"
                        fullWidth
                        label="Verificar Contraseña"
                        required
                        type="password"
                        variant="outlined"
                        size="small"
                        name="repassword"
                        onChange={formikStudent.handleChange}
                        onBlur={formikStudent.handleBlur}
                        value={formikStudent.values.repassword}
                        error={
                          formikStudent.touched.repassword &&
                          Boolean(formikStudent.errors.repassword)
                        }
                        helperText={
                          formikStudent.touched.repassword &&
                          formikStudent.errors.repassword
                        }
                      />
                    </Grid>
                  </Grid>
                  <Box
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
                        label="Registrar Alumno"
                      />
                    </Button>
                  </Box>
                </form>
              )}
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
