import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Box } from "@mui/material";

const ValidateRegValAlumn = (data: any) => {
  const { value } = data;

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {value ? <DoneIcon color="success" /> : <CloseIcon color="error" />}
    </Box>
  );
};

export default ValidateRegValAlumn;
