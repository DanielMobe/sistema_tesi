import { Card, CardContent, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { AuthService } from "src/services/auth/auth.service";
import { AppState } from "src/state/reducer";
import { Periodos } from "src/components/admin/periodos";
import AlumnosTable from "src/components/admin/alumnos";
import MaestrosTable from "src/components/admin/maestros";
import MateriasTable from "src/components/admin/materias";
import CarrerasTable from "src/components/admin/carreras";
import { AdminRoutes, AdminRoutesPush } from "./constAdminRoutes";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const DashboardAdmin = () => {
  const router = useHistory();
  const isLogin = useSelector((state: AppState) => state.student.isLogin);
  const adminData = useSelector((state: AppState) => state.admin.data);
  const [value, setValue] = React.useState(
    AdminRoutesPush.indexOf(router.location.pathname)
  );

  React.useEffect(() => {
    const token = AuthService.getToken();
    if (!token) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    router.push(AdminRoutesPush[newValue]);
    setValue(newValue);
  };

  return (
    <>
      <Box width="100%">
        <Card
          style={{
            borderRadius: "0px",
            maxWidth: "100%",
            marginBottom: "1rem",
          }}
        >
          <CardContent>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              TabIndicatorProps={{ style: { backgroundColor: "#2e7d32" } }}
            >
              <Tab
                label="Periodos"
                {...a11yProps(AdminRoutes.PERIODOS)}
                style={{
                  color: "#2e7d32",
                  fontWeight: value === AdminRoutes.PERIODOS ? 800 : 400,
                }}
              />
              <Tab
                label="Alumnos"
                {...a11yProps(AdminRoutes.ALUMNOS)}
                style={{
                  color: "#2e7d32",
                  fontWeight: value === AdminRoutes.ALUMNOS ? 800 : 400,
                }}
              />
              <Tab
                label="Maestros"
                {...a11yProps(AdminRoutes.MAESTROS)}
                style={{
                  color: "#2e7d32",
                  fontWeight: value === AdminRoutes.MAESTROS ? 800 : 400,
                }}
              />
              <Tab
                label="Materias"
                {...a11yProps(AdminRoutes.MATERIAS)}
                style={{
                  color: "#2e7d32",
                  fontWeight: value === AdminRoutes.MATERIAS ? 800 : 400,
                }}
              />
              <Tab
                label="Carreras"
                {...a11yProps(AdminRoutes.CARRERAS)}
                style={{
                  color: "#2e7d32",
                  fontWeight: value === AdminRoutes.CARRERAS ? 800 : 400,
                }}
              />
            </Tabs>
          </CardContent>
        </Card>
      </Box>
      <Box width="90%" py={2}>
        <Card
          style={{
            borderRadius: "3px",
            maxWidth: "100%",
            marginBottom: "2rem",
          }}
        >
          <CardContent>
            <Box
              padding="1rem"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              ¡Hola,{" "}
              <span style={{ color: "#2e7d32", fontWeight: 800 }}>
                {adminData.name} {adminData.lastname}
              </span>
              !
            </Box>
          </CardContent>
        </Card>
        <TabPanel value={value} index={AdminRoutes.PERIODOS}>
          <Periodos />
        </TabPanel>
        <TabPanel value={value} index={AdminRoutes.ALUMNOS}>
          <AlumnosTable />
        </TabPanel>
        <TabPanel value={value} index={AdminRoutes.MAESTROS}>
          <MaestrosTable />
        </TabPanel>
        <TabPanel value={value} index={AdminRoutes.MATERIAS}>
          <MateriasTable />
        </TabPanel>
        <TabPanel value={value} index={AdminRoutes.CARRERAS}>
          <CarrerasTable />
        </TabPanel>
      </Box>
    </>
  );
};

export default DashboardAdmin;
