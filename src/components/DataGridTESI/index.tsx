import { Box } from "@mui/material";
import {
  DataGrid,
  esES,
  GridColDef,
  GridEventListener,
  GridEvents,
  GridToolbar,
} from "@mui/x-data-grid";
import React, { FC } from "react";

interface DataGridTESII {
  rows: any[];
  columns: GridColDef[];
  loader?: boolean;
  onRowClick?: GridEventListener<GridEvents.rowClick> | undefined;
}

const DataGridTESI: FC<DataGridTESII> = ({
  columns,
  loader = false,
  rows,
  ...props
}) => {
  return (
    <Box height="25rem" minWidth="100%" overflow="auto">
      <DataGrid
        {...props}
        loading={loader}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        components={{ Toolbar: GridToolbar }}
        disableSelectionOnClick
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
};

export default DataGridTESI;
