import React from "react";
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
import { useHistory } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useFormik } from "formik";
import useMediaQueryUpHook from "src/hooks/useMediaQuery";
import { useDispatch } from "react-redux";
import { useRecuperarPasswordMutation } from "src/hooks/reactQueryHooks/useRecuperarPasswordMutation";
import validationSchemaRecoverPass from "src/schemas/schemaRecoverPass";
import LoaderSpinerSubmit from "../isLoadingSpinner";
import { setSnackbar } from "src/state/ducks/snackbar";

const useStyles = makeStyles({
  rootCard: {
    padding: "1rem 3rem",
  },
});

const RecoverPasswordPage = ({
  tipo_user,
}: {
  tipo_user: "alumno" | "maestro";
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useHistory();
  const isMd = useMediaQueryUpHook("md");
  const { mutateAsync, isLoading } = useRecuperarPasswordMutation();

  const back = () => {
    router.push("");
  };

  const validateWidth = () => {
    let widthvalidated = "100%";

    if (isMd) {
      widthvalidated = "25%";
    }

    return widthvalidated;
  };

  const handleSubmit = async ({ email }: { email: string }) => {
    await mutateAsync(
      { email, tipo_user },
      {
        onSuccess: (response) => {
          dispatch(setSnackbar(true, "success", response.menssage));
          back();
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
      email: "",
    },
    validationSchema: validationSchemaRecoverPass(),
    onSubmit: handleSubmit,
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
          <Box fontWeight={1000}>Recuperar contraseña</Box>
        </Typography>
      </Box>
      <CardContent className={classes.rootCard}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                placeholder="Ingresar correo"
                fullWidth
                label="Correo"
                required
                variant="outlined"
                size="small"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
          </Grid>
          <Box marginTop="1rem" width="100%">
            <Button
              variant="contained"
              color="success"
              disabled={isLoading || !formik.isValid}
              type="submit"
              style={{ textTransform: "capitalize" }}
            >
              <LoaderSpinerSubmit
                isSubmitting={isLoading}
                label="Recuperar contraseña"
              />
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};
export default RecoverPasswordPage;
