import React, { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { downloadFile, IS3DataColumns, IS3DataRows } from "../../services/s3";

interface Props {
  assignmentID: string;
}

export const TestFile = ({ assignmentID }: Props) => {
  const [rows, setRows] = useState<IS3DataRows>();
  const [cols, setCols] = useState<IS3DataColumns>();

  const getTestData = async () => {
    const data = await downloadFile(assignmentID);

    if (data !== null) {
      setRows(data.rows);
      setCols(data.columns);
    }
  };

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
      }}
    >
      <DataGrid
        columns={
          cols?.map((col) => ({
            field: col.field,
            headerName: col.headerName,
            flex: 1,
          })) || []
        }
        rows={rows || []}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      <div className="container">
        <Button onClick={getTestData}>Get Details</Button>
      </div>
    </Box>
  );
};

export default TestFile;
