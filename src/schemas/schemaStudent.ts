import * as Yup from "yup";

const validationSchemaStudent = () =>
  Yup.object({
    name: Yup.string()
      // .min(3, "Mínimo 3 caracteres")
      // .max(30, "Máximo 30 caracteres")
      .required("Campo requerido"),
    // .matches(noNumbers, "No incluir números")
    // .matches(noSpecialCharts, "No incluir caracteres especiales"),
    lastname: Yup.string()
      // .min(3, "Mínimo 3 caracteres")
      // .max(30, "Máximo 30 caracteres")
      .required("Campo requerido"),
    // .matches(noNumbers, "No incluir números")
    // .matches(noSpecialCharts, "No incluir caracteres especiales"),
    email: Yup.string()
      .email("Correo electrónico invalido")
      .required("Campo requerido"),
    matricula: Yup.string().required("Campo requerido"),
    password: Yup.string()
      .min(8, "Mínimo 8 caracteres")
      .max(30, "Máximo 30 caracteres")
      .required("Campo requerido"),
    repassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("Campo requerido"),
  });

export default validationSchemaStudent;
