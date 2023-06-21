import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router";

const SelectHome: React.FC = () => {
  const history = useHistory();

  return (
    <Card style={{ padding: "1rem 2rem", borderRadius: "3px" }}>
      <CardContent>
        <Box display="flex" flexDirection="column">
          <Typography variant="h6">
            <Box fontWeight={1000}>Acceso docente o alumnado</Box>
          </Typography>
          <Box
            marginTop="2rem"
            marginBottom="1rem"
            width="100%"
            display="flex"
            justifyContent="space-around"
          >
            <Button
              variant="outlined"
              color="success"
              style={{ textTransform: "capitalize" }}
              onClick={() => history.push("/docente/acceso")}
            >
              Docente
            </Button>
            <Button
              variant="outlined"
              color="success"
              style={{ textTransform: "capitalize" }}
              onClick={() => history.push("/alumno/acceso")}
            >
              Alumno
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SelectHome;
