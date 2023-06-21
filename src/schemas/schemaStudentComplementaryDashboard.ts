import { blankSpace, justNumbers, telRegex } from "src/constants/validations";
import * as Yup from "yup";

const validationSchemaDatosComplementarios = () =>
  Yup.object({
    CURP: Yup.string().required("Campo requerido"),
    calle: Yup.string().required("Campo requerido"),
    num_ext: Yup.string().required("Campo requerido"),
    num_int: Yup.string(),
    entre_calles: Yup.string().required("Campo requerido"),
    referencias: Yup.string().max(50, "Máximo 50 caracteres"),
    colonia: Yup.string().required("Campo requerido"),
    municipio: Yup.string().required("Campo requerido"),
    estado: Yup.string().required("Campo requerido"),
    CP: Yup.string().required("Campo requerido").max(5, "Máximo 5 caracteres"),
    estado_nacimiento: Yup.string().required("Campo requerido"),
    tel_celular: Yup.string()
      .required("Campo requerido")
      .matches(blankSpace, "No se permiten espacios en blanco")
      .matches(justNumbers, "Solo se aceptan números")
      .matches(
        telRegex,
        "Teléfono no válido, se requiere el número a 10 digitos sin espacios"
      )
      .length(10, "Se requiere el número a 10 digitos sin espacios"),
    tel_casa: Yup.string()
      .required("Campo requerido")
      .matches(blankSpace, "No se permiten espacios en blanco")
      .matches(justNumbers, "Solo se aceptan números")
      .matches(
        telRegex,
        "Teléfono no válido, se requiere el número a 10 digitos sin espacios"
      )
      .length(10, "Se requiere el número a 10 digitos sin espacios"),
    tipo_sangre: Yup.string(),
    fecha_nacimiento: Yup.string().required("Campo requerido"),
    years_old: Yup.string()
      .required("Campo requerido")
      .matches(justNumbers, "Solo se aceptan números"),
    sexo: Yup.string().required("Campo requerido"),
    estado_civil: Yup.string().required("Campo requerido"),

    carrera: Yup.string().required("Campo requerido"),
    carrera_n: Yup.string(),

    promedio_bachiller: Yup.string()
      .required("Campo requerido")
      .matches(justNumbers, "Solo se aceptan números"),
    escuela_bachiller: Yup.string().required("Campo requerido"),
    lugar_bachiller: Yup.string().required("Campo requerido"),
    ingreso_bachiller: Yup.string().required("Campo requerido"),
    egreso_bachiller: Yup.string().required("Campo requerido"),
    discapacidad_desc: Yup.string().required("Campo requerido"),

    fecha_solicitud: Yup.string().required("Campo requerido"),

    nombre_padre: Yup.string(),
    fecha_nacimiento_padre: Yup.string(),
    ocupacion_padre: Yup.string(),
    ingresos_padre: Yup.string().matches(
      justNumbers,
      "Solo se aceptan números"
    ),
    tel_padre: Yup.string()
      .matches(blankSpace, "No se permiten espacios en blanco")
      .matches(justNumbers, "Solo se aceptan números")
      .matches(
        telRegex,
        "Teléfono no válido, se requiere el número a 10 digitos sin espacios"
      )
      .length(10, "Se requiere el número a 10 digitos sin espacios"),
    email_padre: Yup.string().email("Correo electrónico invalido"),
    calle_padre: Yup.string(),
    num_ext_padre: Yup.string(),
    num_int_padre: Yup.string(),
    entre_calles_padre: Yup.string(),
    referencias_padre: Yup.string().max(50, "Máximo 50 caracteres"),
    colonia_padre: Yup.string(),
    municipio_padre: Yup.string(),
    estado_padre: Yup.string(),
    CP_padre: Yup.string().max(5, "Máximo 5 caracteres"),

    nombre_madre: Yup.string(),
    fecha_nacimiento_madre: Yup.string(),
    ocupacion_madre: Yup.string(),
    ingresos_madre: Yup.string().matches(
      justNumbers,
      "Solo se aceptan números"
    ),
    tel_madre: Yup.string()
      .matches(blankSpace, "No se permiten espacios en blanco")
      .matches(justNumbers, "Solo se aceptan números")
      .matches(
        telRegex,
        "Teléfono no válido, se requiere el número a 10 digitos sin espacios"
      )
      .length(10, "Se requiere el número a 10 digitos sin espacios"),
    email_madre: Yup.string().email("Correo electrónico invalido"),
    calle_madre: Yup.string(),
    num_ext_madre: Yup.string(),
    num_int_madre: Yup.string(),
    entre_calles_madre: Yup.string(),
    referencias_madre: Yup.string().max(50, "Máximo 50 caracteres"),
    colonia_madre: Yup.string(),
    municipio_madre: Yup.string(),
    estado_madre: Yup.string(),
    CP_madre: Yup.string().max(5, "Máximo 5 caracteres"),
  });

export default validationSchemaDatosComplementarios;
