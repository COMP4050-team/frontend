import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IS3DataRows } from "../../services/s3";

interface Props {
  rows: IS3DataRows;
}

export const TestTable = ({ rows }: Props) => {
  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
      }}
    >
      <DataGrid
        columns={[
          { field: "Test", headerName: "Result", flex: 1 },
          { field: "SID", headerName: "Student ID", flex: 1 },
          { field: "Name", headerName: "Student Name", flex: 1 },
        ]}
        rows={
          rows?.map((row, i) => {
            return {
              id: i,
              ...row,
            };
          }) || []
        }
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
};

export default TestTable;
