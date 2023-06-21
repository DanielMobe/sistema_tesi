import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { errorsHandle } from "src/helpers/errorsHandle";
import { StudentService } from "src/services/student/student.service";
import { setSnackbar } from "src/state/ducks/snackbar";
import { AppState } from "src/state/reducer";

const StudentValidatorDialog = ({
  open,
  hideDialog,
  getCalificaciones,
  title,
  children,
}: {
  open: boolean;
  hideDialog: () => void;
  getCalificaciones: () => void;
  title: string;
  children?: React.ReactNode;
}) => {
  const dispatch = useDispatch();
  const studentData = useSelector((state: AppState) => state.student.data);

  const handleClick = async () => {
    const service = new StudentService();
    try {
      await service.validateCalificaciones({
        id_alumno: String(studentData.id),
        matricula: studentData.matricula,
      });
      hideDialog();
      getCalificaciones();
    } catch (error: any) {
      dispatch(setSnackbar(true, "error", errorsHandle(error)));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={hideDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText fontWeight={700} id="alert-dialog-description">
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={hideDialog} autoFocus>
          Cancelar
        </Button>
        <Button onClick={handleClick} autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentValidatorDialog;
