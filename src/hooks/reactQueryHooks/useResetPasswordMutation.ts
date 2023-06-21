import { UtilService } from "../../services/util/util.service";
import { useMutation } from "react-query";

export const useResetPasswordMutation = () => {
  const service = new UtilService();

  return useMutation(service.resetPassword);
};
