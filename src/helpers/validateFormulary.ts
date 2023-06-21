export const validateFormulary = (
  obj: { [x: string]: any },
  arrFlags: string[]
) => {
  let isValid = false;
  for (let i = 0; i < arrFlags.length; i++) {
    if (!!!obj[arrFlags[i]]) {
      isValid = true;
    }
  }
  return isValid;
};
