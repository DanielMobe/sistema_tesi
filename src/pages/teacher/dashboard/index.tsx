import { Button, Card, CardContent } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { AuthService } from "src/services/auth/auth.service";

const DashboardTeacher = () => {
  const history = useHistory();

  useEffect(() => {
    const token = AuthService.getToken();
    if (!token) {
      history.push("/");
    }
  }, []);

  return (
    <Card style={{ borderRadius: "3px", maxWidth: "100%" }}>
      <CardContent>
        <Box mb={3} fontSize="1.5rem" fontWeight={600}>
          Selecciona una opción
        </Box>
        <Box>
          <Button
            variant="outlined"
            color="success"
            onClick={() =>
              history.push("/docente/dashboard/asignar-calificacion")
            }
            style={{ textTransform: "capitalize", marginRight: "1rem" }}
          >
            Asignar calificación
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() =>
              history.push("/docente/dashboard/eliminar-calificacion")
            }
            style={{ textTransform: "capitalize" }}
          >
            Eliminar calificación
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default DashboardTeacher;
