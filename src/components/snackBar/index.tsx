import { Alert, Snackbar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "src/state/ducks/snackbar";
import { AppState } from "src/state/reducer";

const useStyles = makeStyles((theme: any) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: "2rem",
    },
  },
}));

const CustomizedSnackbars = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const snackbarOpen = useSelector(
    (state: AppState) => state.snackbar.snackbarOpen
  );
  const snackbarType = useSelector(
    (state: AppState) => state.snackbar.snackbarType
  );
  const snackbarMessage = useSelector(
    (state: AppState) => state.snackbar.snackbarMessage
  );
  const handleClose = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setSnackbar(false, snackbarType, snackbarMessage));
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={(event: React.SyntheticEvent) => handleClose(event, "asd")}
          color={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbars;
