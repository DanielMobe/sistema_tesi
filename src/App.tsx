import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import HomeLayout from "./components/homeLayout";
import SelectHome from "./pages";
// import Dashboard from "./pages/dashboard";
import { Home } from "./pages/home";
import DashboardStudent from "./pages/student/dashboard";
import { useEffect } from "react";
import { AuthService } from "./services/auth/auth.service";
import CustomizedSnackbars from "./components/snackBar";
import TeacherAsignNote from "./pages/teacher/dashboard/asignar-califcaciones";
import DashboardTeacher from "./pages/teacher/dashboard";
import TeacherDeleteNote from "./pages/teacher/dashboard/eliminar-calificacion";
import { StudentAccess } from "./pages/student/acceso";
import LoginAdmin from "./pages/admin/login";
import DashboardAdmin from "./pages/admin/dashboard";
import { RegistroAlumno } from "./pages/student/registro";
import RecuperaPasswordPage from "./pages/recuperar/password";
import RecoverPasswordPage from "./components/recoverPassword";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Poppins",
      "Montserrat",
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    return () => {
      const token = AuthService.getToken();
      if (token) {
        AuthService.removeToken();
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/recuperar/password/">
              <HomeLayout>
                <RecuperaPasswordPage />
              </HomeLayout>
            </Route>

            <Route path="/alumno/acceso">
              <HomeLayout>
                <StudentAccess />
              </HomeLayout>
            </Route>
            <Route path="/alumno/registro">
              <HomeLayout>
                <RegistroAlumno />
                {/* <Home /> */}
              </HomeLayout>
            </Route>
            <Route path="/alumno/dashboard">
              <HomeLayout>
                <DashboardStudent />
              </HomeLayout>
            </Route>
            <Route path="/alumno/recuperar-password">
              <HomeLayout>
                <RecoverPasswordPage tipo_user="alumno" />
              </HomeLayout>
            </Route>
            <Route path="/docente/dashboard/asignar-calificacion">
              <HomeLayout>
                <TeacherAsignNote />
              </HomeLayout>
            </Route>
            <Route path="/docente/dashboard/eliminar-calificacion">
              <HomeLayout>
                <TeacherDeleteNote />
              </HomeLayout>
            </Route>
            <Route path="/docente/acceso">
              <HomeLayout>
                <Home />
              </HomeLayout>
            </Route>
            {/* <Route path="/docente/registro">
              <HomeLayout>
                <Home />
              </HomeLayout>
            </Route> */}
            <Route path="/docente/dashboard">
              <HomeLayout>
                <DashboardTeacher />
              </HomeLayout>
            </Route>
            <Route path="/docente/recuperar-password">
              <HomeLayout>
                <RecoverPasswordPage tipo_user="maestro" />
              </HomeLayout>
            </Route>
            <Route path="/admin/acceso">
              <HomeLayout>
                <LoginAdmin />
              </HomeLayout>
            </Route>
            <Route path="/admin/dashboard/periodos">
              <HomeLayout>
                <DashboardAdmin />
              </HomeLayout>
            </Route>
            <Route path="/admin/dashboard/alumnos">
              <HomeLayout>
                <DashboardAdmin />
              </HomeLayout>
            </Route>
            <Route path="/admin/dashboard/maestros">
              <HomeLayout>
                <DashboardAdmin />
              </HomeLayout>
            </Route>
            <Route path="/admin/dashboard/materias">
              <HomeLayout>
                <DashboardAdmin />
              </HomeLayout>
            </Route>
            <Route path="/admin/dashboard/carreras">
              <HomeLayout>
                <DashboardAdmin />
              </HomeLayout>
            </Route>

            <Route path="/">
              <HomeLayout>
                <SelectHome />
              </HomeLayout>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
      <CustomizedSnackbars />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
