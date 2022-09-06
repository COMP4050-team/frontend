import { Box } from '@mui/material';
import { DataGrid} from "@mui/x-data-grid";
// import { useState, useEffect } from 'react';
let Data = require('../data.json');
import TestDetails from "./testDetails";

const columns = Data.columns;
const rows = Data.rows;

export const TestFile = () =>{
    return (
        <Box
            sx={{
                height:400,
                width:'100%'
            }}
        >
            <DataGrid 
                columns={columns} 
                rows={rows}
                pageSize={4}
                rowsPerPageOptions={[4]} 
            />
            <TestDetails />
        </Box>
    )
  };

  export default TestFile;