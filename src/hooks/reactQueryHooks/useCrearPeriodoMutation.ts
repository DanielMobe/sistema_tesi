import { AdminService } from "../../services/admin/admin.service";
import { useMutation } from "react-query";

export const useCrearPeriodoMutation = () => {
  const service = new AdminService();

  return useMutation(service.setPeriodo);
};
