import { Box, Modal, Typography } from "@mui/material";
import React, { FC } from "react";
import useMediaQueryUpHook from "src/hooks/useMediaQuery";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "30%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface ModalGeneralI {
  title: string;
  open: boolean;
  handleClose: () => void;
}

const ModalGeneral: FC<ModalGeneralI> = ({
  title,
  open,
  handleClose,
  children,
}) => {
  const isMdUp = useMediaQueryUpHook();

  return (
    <Modal open={open} onClose={handleClose}>
      <Box borderRadius={1} sx={style} width={isMdUp ? "auto" : "80%"}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Box id="modal-modal-description" sx={{ mt: 2 }}>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalGeneral;
