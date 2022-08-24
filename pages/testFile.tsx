import { Table, Box } from '@mui/material';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

type TestFileProp = {
    setTestFile: any;
    testFile: any;
}

const columns: GridColDef[] =[
    {
        field: 'studentID',
        headerName: 'SID',
        width: 80
    },
    {
        field: 'studentName',
        headerName: 'Student Name',
        width: 150,
        editable: true,
    },
    {
        field: 'assignment',
        headerName: 'Assignment',
        width: 100,
    },
    {
        field: 'testsPassed',
        headerName: 'Tests Passed',
        width: 120,
    },
    {
        field: 'testsFailed',
        headerName: 'Tests Failed',
        width: 120,
    }
]

const rows = [
    { id: 1, studentID: '0001', studentName: 'Alexina', assignment:'COMP1000', testsPassed: 10, testsFailed: 0 },
    { id: 2, studentID: '0002', studentName: 'Jordina', assignment:'COMP1000', testsPassed: 5, testsFailed: 5 },
    { id: 3, studentID: '0003', studentName: 'Zohreba', assignment:'COMP1000', testsPassed: 3, testsFailed: 7 },
    { id: 4, studentID: '0004', studentName: 'Brianna', assignment:'COMP1000', testsPassed: 1, testsFailed: 9 }

]

export const TestFile = () =>{
    // useEffect(()=> {
    //     setTestFile(testFile);
    //     if(TestFile.length == 0) console.log("long");
    // }, []
    // );
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
        </Box>
    )
  };