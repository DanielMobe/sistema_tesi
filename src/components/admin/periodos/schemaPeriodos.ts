import * as Yup from "yup";

const validationSchemaPeriodos = () =>
  Yup.object({
    year: Yup.number()
      .required("Campo requerido")
      .moreThan(0, "No puede ser 0"),
    periodo: Yup.number()
      .required("Campo requerido")
      .moreThan(0, "No puede ser 0"),
  });

export default validationSchemaPeriodos;
