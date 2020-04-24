import React from 'react';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AppBar from '@material-ui/core/AppBar';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PublishIcon from '@material-ui/icons/Publish';
import teal from '@material-ui/core/colors/teal';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Stage, Layer, Group, Rect, Text, Arrow } from 'react-konva';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },

  appBar: {
    background: 'teal',
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

  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },

  info: {
    fontFamily: 'calibri',
    fontSize: 12
  },

  title: {
    flexGrow: 1,
    fontFamily: 'Calibri'
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
  const [addonDialogOpen, setAddonDialogOpen] = React.useState(false);
  const [selectedComponent, selectComponent] = React.useState(null);
  const [selectedAddonType, selectAddonType] = React.useState('cosmosdb');

  const componentWidth = 150;

  const mock = {
      buildingBlocks: [
        {
            id: 'bb 1',
            name: 'windermere',
            type: 'app',
            runtime: 'reactjs',
            status: 'pending',
            isPrivate: false,
            position: {
                top: 50, 
                left: 50
            }
        },
        {
            id: 'bb 2',
            name: 'cosmos db',
            type: 'db',
            runtime: 'cosmosdb',
            status: 'pending',
            isPrivate: true,
            position: {
                top: 50, 
                left: 550
            }
        },
        {
          id: 'bb 3',
          name: 'keyvault',
          type: 'db',
          runtime: 'keyvault',
          status: 'pending',
          isPrivate: true,
          position: {
              top: 150, 
              left: 550
          }
      },
      ]
  }

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

  const handleComponentClick = (e, component) => {
    selectComponent(component);
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Solution Architecture
          </Typography>
          <Button
            className={classes.actionButton}
            variant="outlined"
            color="inherit"
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleNewBbClick}
          >
            New
          </Button>
          <Button
            className={classes.actionButton}
            variant="outlined"
            color="inherit"
            startIcon={<ArrowForwardIosIcon />}>
            Promote
          </Button>
          <Button
            className={classes.actionButton}
            variant="outlined"
            color="inherit"
            startIcon={<PublishIcon />}>
            Publish
          </Button>
        </Toolbar>
      </AppBar>
      <Dialog open={addonDialogOpen} onClose={handleAddonDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{!selectedComponent ? '' : selectedComponent.name}: Add-on</DialogTitle>
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
      <main className={classes.content}>
        <div style={{width: '100%' }}>
          <Box display='flex' flexDirection='row'>
            <Stage width={window.innerWidth - 300 } height={window.innerHeight}>
          <Layer>
          {
            mock.buildingBlocks.map((component, i) => {
                return (
                  <Group 
                    name={component.id}
                    draggable={true}
                    onClick={(e) => handleComponentClick(e, component)}>
                    <Rect
                      name={component.id}
                      x={component.position.left}
                      y={component.position.top}
                      width={componentWidth}
                      height={50}
                      fill={component.isPrivate ? 'pink' : 'lightgreen'}
                      stroke={selectedComponent && selectedComponent.id === component.id ? 'black' : 'gray'}
                      strokeWidth={selectedComponent && selectedComponent.id === component.id ? 1.0 : 0.2}
                    />
                    <Text 
                      name={component.id}
                      text={component.name}
                      align='center'
                      fontSize={16}
                      fontFamily='Calibri'
                      x={component.position.left}
                      y={component.position.top + 3}
                      width={componentWidth}
                      >
                    </Text>
                </Group>);
            })
        }
        
        </Layer>
        </Stage>
            <Box style={{background: teal[50], width: 300, padding: 10 }}>
              <Typography className={classes.title} variant="h5" component="h2" align='center'>
                    BronzeFat
              </Typography>
              <Typography className={classes.info} color="textSecondary" align='center'>
                (App)
              </Typography>
            </Box>
          </Box>
        </div>
      </main>
    </div>
  );
}