import * as Yup from "yup";

const validationSchemaLogin = () =>
  Yup.object({
    email: Yup.string()
      .email("Correo electrónico invalido")
      .required("Campo requerido"),
    password: Yup.string()
      .min(8, "Mínimo 8 caracteres")
      .max(30, "Máximo 30 caracteres")
      .required("Campo requerido"),
  });

export default validationSchemaLogin;
