import React from 'react';
import clsx from 'clsx';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  iconButtonLabel: {
    display: 'flex',
    flexDirection: 'column',
  },

  subToolbar: {
    background: 'lightgrey'
  },

  title: {
    flexGrow: 1,
  }
}));

export default () => {
  const classes = useStyles();
  const [open] = React.useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Solution Architecture
          </Typography>
        </Toolbar>
        <Toolbar className={classes.subToolbar}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            startIcon={<AddCircleOutlineIcon />}
          >
            New
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}