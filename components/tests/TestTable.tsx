import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { downloadFile } from "../../services/s3";

interface Props {
  unitName: string;
  assignmentName: string;
}

export const TestTable = ({ unitName, assignmentName }: Props) => {
  const [rows, setRows] = useState<
    {
      SID: string;
      Test: string;
      Name: string;
    }[]
  >();

  useEffect(() => {
    downloadFile(`${unitName}/${assignmentName}/Results/result.json`).then(
      (data) => {
        if (data !== null) {
          setRows(data.rows);
        }
      }
    );
  }, [assignmentName, unitName]);

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
