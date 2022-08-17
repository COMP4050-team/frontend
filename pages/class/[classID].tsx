import type { NextPage } from 'next';
import { useMutation, useQuery } from 'urql';
import {
  CreateAssignmentDocument,
  GetClassDocument,
} from '../../gql/generated/graphql';
import { useRouter } from 'next/router';
import { CustomList } from '../../components/CustomList';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import moment from 'moment';

const ClassPage: NextPage = () => {
  const router = useRouter();
  const { classID } = router.query;
  const [result, reexecuteQuery] = useQuery({
    query: GetClassDocument,
    variables: { id: classID as string },
  });
  const [, createAssignment] = useMutation(CreateAssignmentDocument);
  const [showAddAssignmentDialog, setShowAddAssignmentDialog] = useState(false);
  const [newAssignmentName, setNewAssignmentName] = useState('');
  const [newAssignmentDueDate, setNewAssignmentDueDate] =
    useState<moment.Moment | null>();

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  const toggleAddAssignmentDialog = () => {
    setShowAddAssignmentDialog(!showAddAssignmentDialog);
  };

  const handleAddAssignment = async () => {
    await createAssignment({
      assignment: {
        name: newAssignmentName,
        classID: classID as string,
        dueDate: newAssignmentDueDate
          ? Math.floor(newAssignmentDueDate.toDate().getTime() / 1000)
          : Math.floor(new Date().getTime() / 1000),
      },
    });
    await reexecuteQuery({ requestPolicy: 'network-only' });
    toggleAddAssignmentDialog();
  };

  return (
    <>
      <Typography align='center' variant='h3'>
        {result.data?.class?.name}
      </Typography>

      <Dialog
        open={showAddAssignmentDialog}
        onClose={toggleAddAssignmentDialog}
        aria-labelledby='form-dialog-title'
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle id='form-dialog-title'>
          Add an Assignment for this Class
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the assignment&apos;s details.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Assignment Name'
            type='text'
            fullWidth
            onChange={(e) => setNewAssignmentName(e.target.value)}
          />
          <div className='mt-4'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label='DateTimePicker'
                value={newAssignmentDueDate}
                onChange={(newValue) => {
                  setNewAssignmentDueDate(newValue);
                }}
              />
            </LocalizationProvider>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={toggleAddAssignmentDialog}>
            Cancel
          </Button>
          <Button color='primary' onClick={handleAddAssignment}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <IconButton aria-label='add' onClick={toggleAddAssignmentDialog}>
        <Add />
      </IconButton>
      <CustomList
        items={
          result.data?.class?.assignments.map((assignment) => {
            return {
              text: assignment.name,
              href: `/assignment/${assignment.id}`,
            };
          }) ?? []
        }
      />
    </>
  );
};

export default ClassPage;
