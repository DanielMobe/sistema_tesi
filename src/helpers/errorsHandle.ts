export const errorsHandle = (error: {
  response: {
    data: any;
  };
}) => {
  let responseError: any = "";
  if (error.response.data.action) {
    responseError = error.response.data.action;
  } else {
    if (typeof error.response.data.errors === "string") {
      responseError = error.response.data.errors;
    } else {
      responseError = Object.values(error.response.data.errors)[0];
    }
  }
  return responseError;
};
