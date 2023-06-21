import { UtilService } from "../../services/util/util.service";
import { useMutation } from "react-query";

export const useRecuperarPasswordMutation = () => {
  const service = new UtilService();

  return useMutation(service.recoverPassword);
};
