import * as Yup from "yup";

const recuperarPassSchema = () =>
  Yup.object({
    password: Yup.string()
      .min(8, "Mínimo 8 caracteres")
      .max(30, "Máximo 30 caracteres")
      .required("Campo requerido"),
    repassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("Campo requerido"),
  });

export default recuperarPassSchema;
