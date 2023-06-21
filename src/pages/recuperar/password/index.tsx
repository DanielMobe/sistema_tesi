import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import recuperarPassSchema from "src/schemas/schemaRecuperarPassword";
import LoaderSpinerSubmit from "src/components/isLoadingSpinner";
import useMediaQueryUpHook from "src/hooks/useMediaQuery";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useResetPasswordMutation } from "src/hooks/reactQueryHooks/useResetPasswordMutation";
import { useDispatch } from "react-redux";
import { setSnackbar } from "src/state/ducks/snackbar";

interface QueryDataI {
  codigo: string;
  tipo: string;
}

const useStyles = makeStyles({
  rootCard: {
    padding: "2rem 3rem",
  },
});

const RecuperaPasswordPage = () => {
  const history = useHistory();
  const { search } = useLocation();
  const { data } = queryString.parse(search);
  const classes = useStyles();
  const [queryData, setqueryData] = useState<QueryDataI>();
  const { mutateAsync, isLoading } = useResetPasswordMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!data && !!atob(data as string)) {
      setqueryData(JSON.parse(atob(data as string)));
    } else {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isMd = useMediaQueryUpHook("md");

  const handleSubmit = async () => {
    await mutateAsync(
      {
        code: queryData!.codigo,
        pwdN: formik.values.password,
        tipo_user: queryData!.tipo,
      },
      {
        onSuccess: () => {
          dispatch(setSnackbar(true, "success", "Contraseña actualizada."));
          history.push("/");
        },
        onError: (error: any) => {
          dispatch(
            setSnackbar(
              true,
              "error",
              error.response.data.menssage ||
                "Ocurrio un error, intentar más tarde"
            )
          );
        },
      }
    );
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      repassword: "",
    },
    validationSchema: recuperarPassSchema(),
    onSubmit: handleSubmit,
  });

  const validateWidth = () => {
    let widthvalidated = "100%";

    if (isMd) {
      widthvalidated = "25%";
    }

    return widthvalidated;
  };

  return (
    <Card style={{ borderRadius: "3px", width: validateWidth() }}>
      <Box px={4} pt={3}>
        <Typography>
          <Box fontWeight={1000}>Crear nueva contraseña</Box>
        </Typography>
      </Box>
      <CardContent className={classes.rootCard}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                placeholder="Ingresar contraseña"
                fullWidth
                label="Nueva contraseña"
                required
                type="password"
                variant="outlined"
                size="small"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder="Ingresar de nuevo la contraseña"
                fullWidth
                label="Repetir nueva contraseña"
                required
                type="password"
                variant="outlined"
                size="small"
                name="repassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.repassword}
                error={
                  formik.touched.repassword && Boolean(formik.errors.repassword)
                }
                helperText={
                  formik.touched.repassword && formik.errors.repassword
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="success"
                disabled={formik.isSubmitting || !formik.isValid || isLoading}
                type="submit"
                style={{ textTransform: "capitalize" }}
              >
                <LoaderSpinerSubmit
                  isSubmitting={formik.isSubmitting}
                  label="Cambiar contraseña"
                />
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};
export default RecuperaPasswordPage;
