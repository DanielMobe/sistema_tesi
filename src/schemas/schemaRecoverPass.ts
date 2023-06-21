import * as Yup from "yup";

const validationSchemaRecoverPass = () =>
  Yup.object({
    email: Yup.string()
      .email("Correo electrónico invalido")
      .required("Campo requerido"),
  });

export default validationSchemaRecoverPass;
