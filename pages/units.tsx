import type { NextPage } from "next";
import { useMutation, useQuery } from "urql";
import { CreateUnitDocument, GetUnitsDocument } from "../gql/generated/graphql";
import { CustomList } from "../components/CustomList";
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
import { Add } from "@mui/icons-material";
import { useState } from "react";

const UnitsPage: NextPage = () => {
  const [, createUnit] = useMutation(CreateUnitDocument);
  const [result, reexecuteQuery] = useQuery({
    query: GetUnitsDocument,
  });
  const [showAddUnitDialog, setShowAddUnitDialog] = useState(false);
  const [newUnitName, setNewUnitName] = useState("");

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  const toggleAddUnitDialog = () => {
    setShowAddUnitDialog(!showAddUnitDialog);
  };

  const handleAddUnit = async () => {
    await createUnit({ unit: { name: newUnitName } });
    await reexecuteQuery({ requestPolicy: "network-only" });
    toggleAddUnitDialog();
  };

  return (
    <>
      <Typography align="center" variant="h3">
        Units
      </Typography>

      <Dialog
        open={showAddUnitDialog}
        onClose={toggleAddUnitDialog}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="form-dialog-title">Add Unit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the unit&apos;s details.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Unit Name"
            type="text"
            fullWidth
            onChange={(e) => setNewUnitName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={toggleAddUnitDialog}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleAddUnit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <IconButton aria-label="add" onClick={toggleAddUnitDialog}>
        <Add />
      </IconButton>

      <CustomList
        items={
          result.data?.units.map((unit) => {
            return {
              text: unit.name,
              href: `/unit/${unit.id}`,
            };
          }) ?? []
        }
      />
    </>
  );
};

export default UnitsPage;
