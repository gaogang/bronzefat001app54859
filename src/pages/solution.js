import React from 'react';
import PropTypes from 'prop-types';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AppBar from '@material-ui/core/AppBar';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PublishIcon from '@material-ui/icons/Publish';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';

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

  avatar: {
    fontSize: 12,
    backgroundColor: red[500]
  },

  avatarDb: {
    backgroundColor: blue[500]
  },

  buildingBlock: {
    maxWidth: 300,
    minWidth: 280,
    position: 'absolute'
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },

  tab: {
      background: 'cornflowerblue'
  },

  title: {
    flexGrow: 1,
  }
}));

const addonTypes = [
    {
        value: 'Api',
        label: 'Api',
    },
    {
        value: 'cosmosdb',
        label: 'Cosmos DB',
    },
    {
        value: 'keyvault',
        label: 'Key Vault'
    },
    {
        value: 'sfconnect',
        label: 'Salesforce Connect'
    }
  ];

export default () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const [addonDialogOpen, setAddonDialogOpen] = React.useState(false);
  const [selectedBb, selectBb] = React.useState(null);
  const [selectedAddonType, selectAddonType] = React.useState('cosmosdb');

  const mock = {
      buildingBlocks: [
        {
            id: 'bb 1',
            name: 'windermere',
            type: 'app',
            runtime: 'reactjs',
            status: 'pending',
            isPrivate: true,
            position: {
                top: 250, 
                left: 50
            }
        },
        {
            id: 'bb 2',
            name: 'windermeredb',
            type: 'db',
            runtime: 'cosmosdb',
            status: 'pending',
            isPrivate: false,
            position: {
                top: 250, 
                left: 550
            }
        },
      ]
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNewAddonClick = (bb) => {
      if (bb.type !== 'app') {
          return;
      }

    selectBb(bb);
    setAddonDialogOpen(true);
  };

  const handleAddonDialogClose = () => {
        setAddonDialogOpen(false);
  }

  const handleNewBbClick = () => {
        alert('create new bb');
  }

  const handleAddonTypeChange = (event) => {
    selectAddonType(event.target.value);
  }

  const handleAddonCreate = () => {
      alert('create ' + selectedAddonType);
  }


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
      <Dialog open={addonDialogOpen} onClose={handleAddonDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{!selectedBb ? '' : selectedBb.name}: Add-on</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="type"
            label="Add-on Type"
            select
            value={selectedAddonType}
            onChange={handleAddonTypeChange}
            fullWidth
            SelectProps={{
              native: true,
            }}
          >
            {addonTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          </TextField>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Add-on name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddonDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddonCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <TabPanel value={value} index={0}>
        <Toolbar className={classes.actionToolbar}>
          <Button
            className={classes.actionButton}
            variant="outlined"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleNewBbClick}
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
        {
            mock.buildingBlocks.map((bb, i) => {
                return (
                    <Card className={classes.buildingBlock} style={{top: bb.position.top, left: bb.position.left}}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="bbtype" className={clsx(classes.avatar, {
                                    [classes.avatarDb] : bb.type === 'db',
                                })}>
                                    {bb.type}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={bb.name}
                            subheader={bb.status}
                        />
                        <CardActions disableSpacing>
                            <FormControlLabel control={<Switch
                                //checked={state.checkedA}
                                //onChange={handleChange}
                                name="isPrivate"
                                inputProps={{ 'aria-label': 'Is private' }}
                                />} 
                                label={<Typography variant="body2" color="textSecondary">private</Typography>}
                                labelPlacement="start"
                            />
                            { bb.type === 'app' &&
                                <IconButton 
                                    aria-label="add-ons" 
                                    onClick={() => handleNewAddonClick(bb)} >
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            }
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                                >
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                            <   Typography paragraph>Under construction</Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                );
            })
        }
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