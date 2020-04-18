import React from 'react';
import PropTypes from 'prop-types';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AppBar from '@material-ui/core/AppBar';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box';
import PublishIcon from '@material-ui/icons/Publish';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={0}>{children}</Box>}
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  actionButton: {
    marginLeft: 5,
    marginRight: 5
  },

  actionBar: {
    background: 'white'
  },

  tab: {
      background: 'cornflowerblue'
  },

  title: {
    flexGrow: 1,
  }
}));

export default () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Solution Architecture
          </Typography>
        </Toolbar>
        <Tabs className={classes.tab} value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Development" {...a11yProps(0)} />
          <Tab label="Production" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Toolbar className={classes.actionToolbar}>
          <Button
            className={classes.actionButton}
            variant="outlined"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
          >
            New
          </Button>
          <Button
            className={classes.actionButton}
            variant="outlined"
            color="primary"
            startIcon={<ArrowForwardIosIcon />}>
            Promote
          </Button>
          <Button
            className={classes.actionButton}
            variant="outlined"
            color="primary"
            startIcon={<PublishIcon />}>
            Publish
          </Button>
        </Toolbar>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Toolbar className={classes.actionBar}>
          <Button
            className={classes.actionButton}
            variant="outlined"
            color="primary"
            startIcon={<PublishIcon />}>
            Publish
          </Button>
        </Toolbar>
      </TabPanel>
    </div>
  );
}