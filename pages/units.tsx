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
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import RefreshIcon from "@mui/icons-material/Refresh";
import { setNodes } from "../state/features/navbar/navbarSlice";
import { useDispatch } from "react-redux";

const UnitsPage: NextPage = () => {
  const [, createUnit] = useMutation(CreateUnitDocument);
  const [result, reexecuteQuery] = useQuery({
    query: GetUnitsDocument,
  });
  const [units, setUnits] = useState(result.data?.units);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddUnitDialog, setShowAddUnitDialog] = useState(false);
  const [newUnitName, setNewUnitName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setUnits(result.data?.units);
    dispatch(
      setNodes([
        { value: "ProTest", href: "/" },
        { value: "Units", href: "/units" },
      ])
    );
  }, [dispatch, result.data?.units]);

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

      <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon color="inherit" sx={{ display: "block" }} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search by unit"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: "default" },
                  }}
                  variant="standard"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{ mr: 1 }}
                  arai-label="add"
                  onClick={toggleAddUnitDialog}
                >
                  Add Unit
                </Button>
                <Tooltip title="Reload">
                  <IconButton>
                    <RefreshIcon color="inherit" sx={{ display: "block" }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div style={{ margin: "2rem 5rem" }}>
          <CustomList
            items={
              units
                ?.filter((unit) => {
                  if (searchQuery === "") {
                    return unit;
                  }
                  return unit.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
                })
                .map((unit) => {
                  return {
                    text: unit.name,
                    href: `/unit/${unit.id}`,
                  };
                }) ?? []
            }
          />
        </div>
      </Paper>
    </>
  );
};

export default UnitsPage;
