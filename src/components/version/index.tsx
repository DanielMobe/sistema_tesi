import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "src/state/reducer";
import { studentLogout } from "src/state/student/student.store.actions";
import { teacherLogout } from "src/state/teacher/teacher.store.actions";
import { useHistory } from "react-router";
import { AuthService } from "src/services/auth/auth.service";
import { adminLogout } from "src/state/admin/admin.store.actions";
import LoaderSpinerSubmit from "../isLoadingSpinner";

const Version: React.FC<any> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state: AppState) => state);
  const [loader, setloader] = useState(false);
  const filterState = state;
  const {
    student: {
      isLogin: isLoginStudent,
      data: { id: idStudent },
    },
    teacher: {
      isLogin: isLoginTeacher,
      data: { id: idTeacher },
    },
    admin: {
      isLogin: isLoginAdmin,
      data: { id: idAdmin },
    },
  } = filterState;

  const isLogin = () => {
    let returnValue = false;
    const token = AuthService.getToken();
    if (token) {
      if (isLoginStudent || isLoginTeacher || isLoginAdmin) {
        returnValue = true;
      }
    }
    return returnValue;
  };

  const logoutSesion = async () => {
    setloader(true);
    if (isLoginStudent) {
      await dispatch(studentLogout({ id: idStudent }, history));
      setloader(false);
    }
    if (isLoginTeacher) {
      await dispatch(teacherLogout({ id: idTeacher }, history));
      setloader(false);
    }
    if (isLoginAdmin) {
      await dispatch(adminLogout({ id: idAdmin }, history));
      setloader(false);
    }
  };

  return (
    <Box
      height="1.5rem"
      borderBottom="1px solid #d8d8d8"
      padding="0.5rem"
      bgcolor="#f7f7f7"
      display="flex"
      alignItems="center"
    >
      <Box
        display="flex"
        alignItems="center"
        color="#444444"
        justifyContent="space-between"
        width="100%"
      >
        <Box display="flex" alignItems="center">
          <LockIcon style={{ fontSize: "0.9rem" }} />
          <Typography>
            <Box fontWeight={1000} fontSize="0.9rem">
              ::DEPARTAMENTO DE CONTROL ESCOLAR:: Version 1.02
            </Box>
          </Typography>
        </Box>
        {isLogin() && (
          <Box
            onClick={logoutSesion}
            component={Button}
            variant="text"
            disabled={loader}
            style={{ color: "#444444" }}
            display="flex"
            alignItems="center"
          >
            {!loader && <ExitToAppIcon style={{ fontSize: "0.9rem" }} />}
            <Typography>
              <Box fontWeight={1000} fontSize="0.9rem">
                <LoaderSpinerSubmit
                  isSubmitting={loader}
                  label="CERRAR SESIÓN"
                />
              </Box>
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Version;
