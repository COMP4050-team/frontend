import {
  Card,
  CardContent,
  Typography,
  Grid,
  Tooltip,
  Dialog,
} from "@mui/material";
import React, { useState } from "react";
import { IS3DataResult, IS3DataResultTest } from "../../services/s3";

interface Props {
  testResult: IS3DataResult;
}

const StudentTestResult: React.FC<Props> = ({ testResult }) => {
  const [selectedTest, setSelectedTest] = useState<IS3DataResultTest | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Card sx={{ marginTop: 2, width: 1 / 2, marginX: "auto" }}>
      <CardContent
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {testResult.student_id}
          </Typography>
          <Typography variant="h5" component="div">
            {testResult.student_name}
          </Typography>
        </div>
        <Grid container gap={1} columns={testResult.tests.length} marginTop={2}>
          {testResult.tests.map((test) => (
            <Grid item key={test.name}>
              <Tooltip
                title={test.name}
                onClick={() => {
                  setSelectedTest(test);
                  setDialogOpen(true);
                }}
              >
                <div
                  className={`w-8 aspect-square rounded ${
                    test.passed ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
              </Tooltip>
              <Dialog
                // fullScreen
                open={dialogOpen}
                onClose={() => {
                  setDialogOpen(false);
                  setSelectedTest(null);
                }}
                // TransitionComponent={Transition}
              >
                <div className="p-4">
                  <Typography variant="h5" component="div">
                    {selectedTest?.name}
                  </Typography>
                  <Typography variant="body1" component="div">
                    {selectedTest?.message}
                  </Typography>
                </div>
              </Dialog>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StudentTestResult;
