import { AdminService } from "../../services/admin/admin.service";
import { useMutation } from "react-query";

export const useActivarPeriodoMutation = () => {
  const service = new AdminService();

  return useMutation(service.activarPeriodo);
};
