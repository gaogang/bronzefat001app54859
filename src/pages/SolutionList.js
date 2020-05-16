import React from 'react';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AppBar from '@material-ui/core/AppBar';

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const regions = [
  {
    value: 'centralus',
    label: 'Central US',
  },
  {
    value: 'uksouth',
    label: 'UK South',
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  actionBar: {
    background: 'white'
  },

  title: {
    flexGrow: 1,
  }
}));

export default () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [region, setRegion] = React.useState('uksouth');

  const handleClickNew = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Solution Architecture
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.actionBar}>
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleClickNew}
          >
          New
        </Button>
      </Toolbar>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create new app</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new app, please enter the name of the app and its region here. Other configurations can 
            be set in the app page.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="App name"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Region"
            select
            value={region}
            onChange={handleRegionChange}
            fullWidth
            SelectProps={{
              native: true,
            }}
          >
            {regions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
