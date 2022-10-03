import { Add } from "@mui/icons-material";
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
} from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation, useQuery } from "urql";
import { CustomList } from "../../components/CustomList";
import {
  CreateClassDocument,
  GetUnitDocument,
} from "../../gql/generated/graphql";
import { setNodes } from "../../state/features/navbar/navbarSlice";

const UnitPage: NextPage = () => {
  const router = useRouter();
  const { unitID } = router.query;
  const [, createClass] = useMutation(CreateClassDocument);
  const [result, reexecuteQuery] = useQuery({
    query: GetUnitDocument,
    variables: { id: unitID as string },
  });
  const [showAddClassDialog, setShowAddClassDialog] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (result.data?.unit?.name) {
      dispatch(
        setNodes([
          { value: "ProTest", href: "/" },
          {
            value: result.data.unit.name,
            href: `/unit/${result.data.unit.id}`,
          },
        ])
      );
    }
  }, [dispatch, result]);

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  const toggleAddClassDialog = () => {
    setShowAddClassDialog(!showAddClassDialog);
  };

  const handleAddUnit = async () => {
    await createClass({
      class: { name: newClassName, unitID: unitID as string },
    });
    await reexecuteQuery({ requestPolicy: "network-only" });
    toggleAddClassDialog();
  };

  return (
    <>
      <Typography align="center" variant="h3">
        {result.data?.unit?.name}
      </Typography>

      <Dialog
        open={showAddClassDialog}
        onClose={toggleAddClassDialog}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">
          Add a Class to this Unit
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the class&apos;s details.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Class Name"
            type="text"
            fullWidth
            onChange={(e) => setNewClassName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={toggleAddClassDialog}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleAddUnit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <IconButton aria-label="add" onClick={toggleAddClassDialog}>
        <Add />
      </IconButton>

      <CustomList
        items={
          result.data?.unit?.classes.map((class_) => {
            return {
              text: class_.name,
              href: `/class/${class_.id}`,
            };
          }) ?? []
        }
      />
    </>
  );
};

export default UnitPage;
