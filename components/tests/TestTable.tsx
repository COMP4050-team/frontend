import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { IS3DataResult } from "../../services/s3";

interface Props {
  rows: IS3DataResult[];
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
          { field: "student_id", headerName: "Student ID", flex: 1 },
          { field: "student_name", headerName: "Student Name", flex: 1 },
          { field: "failed", headerName: "Failed", flex: 1 },
          { field: "passed", headerName: "Passed", flex: 1 },
        ]}
        rows={
          rows?.map((row, i) => {
            return {
              id: i,
              ...row,
              passed: row.tests
                .filter((test) => test.passed)
                .map((test) => test.name)
                .join(", "),
              failed: row.tests
                .filter((test) => !test.passed)
                .map((test) => test.name)
                .join(", "),
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
