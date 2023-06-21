import React from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import useMediaQueryUpHook from "src/hooks/useMediaQuery";
import validationSchemaLogin from "src/schemas/schemaLogin";
import { LoginData } from "src/types/login.types";
import { loginAdmin } from "src/state/admin/admin.store.actions";
import LoaderSpinerSubmit from "src/components/isLoadingSpinner";

const useStyles = makeStyles({
  rootCard: {
    padding: "1rem 3rem",
  },
});

const LoginAdmin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useHistory();
  const isMd = useMediaQueryUpHook("md");

  const validateWidth = () => {
    let widthvalidated = "100%";

    if (isMd) {
      widthvalidated = "25%";
    }

    return widthvalidated;
  };

  const loginSubmit = async (data: LoginData) => {
    await dispatch(loginAdmin(data, router));
    formikLogin.setSubmitting(false);
  };

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
        <Typography>
          <Box fontWeight={1000}>Acceso Admin</Box>
        </Typography>
      </Box>
      <CardContent className={classes.rootCard}>
        <Box display="flex" flexDirection="column" alignItems="end">
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
                    formikLogin.touched.password && formikLogin.errors.password
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
              <Button
                variant="contained"
                color="success"
                type="submit"
                disabled={formikLogin.isSubmitting}
                style={{ textTransform: "capitalize" }}
              >
                <LoaderSpinerSubmit
                  isSubmitting={formikLogin.isSubmitting}
                  label="Iniciar sesión"
                />
              </Button>
            </Box>
          </form>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginAdmin;
