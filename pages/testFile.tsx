import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
let Data = require("../data.json");
import TestDetails from "./testDetails";

const columns = Data.columns;
const rows = Data.rows;

export const TestFile = () => {
  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
      }}
    >
      <DataGrid
        columns={columns}
        rows={rows}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      <TestDetails />
    </Box>
  );
};

export default TestFile;
