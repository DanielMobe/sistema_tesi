import { CircularProgress } from "@mui/material";
import React, { FC } from "react";

interface LoaderSpinerI {
  isSubmitting: boolean;
  label: string;
}

const LoaderSpinerSubmit: FC<LoaderSpinerI> = ({ isSubmitting, label }) => {
  return <>{isSubmitting ? <CircularProgress size={20} /> : label}</>;
};

export default LoaderSpinerSubmit;
