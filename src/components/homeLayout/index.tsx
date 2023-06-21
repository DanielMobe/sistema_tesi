import React from "react";
import { Box } from "@mui/system";
import Header from "../header";
import Version from "../version";
import Footer from "../footer";
import { Snackbar } from "@mui/material";

interface HomeLayoutI {
  children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutI> = ({ children }) => {
  const [modal, setmodal] = React.useState({
    open: false,
    message: "",
  });

  return (
    <Box width="100%">
      <Header />
      <Version />
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        minHeight="30rem"
        bgcolor="#1f2b46"
        // bgcolor="#d4e7fd"
      >
        {children}
      </Box>
      <Footer />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={modal.open}
        onClose={() => setmodal({ ...modal, open: false, message: "" })}
        message={modal.message}
        key={"top" + "right"}
        autoHideDuration={6000}
      />
    </Box>
  );
};

export default HomeLayout;
