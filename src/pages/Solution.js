import React from 'react';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddonPane from '../components/AddonPane'
import AppBar from '@material-ui/core/AppBar';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import CanvasPane from '../components/CanvasPane'
import ComponentPropertyPane from '../components/ComponentPropertyPane'
import CssBaseline from '@material-ui/core/CssBaseline';
import DevopsPane from '../components/DevOpsPane'
import NewAppDialog from '../dialogs/NewAppDialog'
import PublishIcon from '@material-ui/icons/Publish';
import grey from '@material-ui/core/colors/grey';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import OrderNewComponent from '../utils/OrderNewComponent'
import PositionComponent from '../utils/PositionComponent'

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
    fontSize: 14
  },

  sidebar: {
    background: grey[200],
    width: 300, 
    padding: 10
  },

  title: {
    flexGrow: 1,
    fontSize: 16
  }
}));

export default () => {
  const buildingBlocks = {
    components: [
      {
        id: 'bb 1',
        order: 0,
        name: 'windermere',
        type: 'app',
        runtime: 'reactjs',
        status: 'pending',
        isPrivate: false,
        resource: 'AppServices',
        display: {
          mode: 'auto'
        },
        devops: {
          staging: 
          {
            enabled: true, 
            stages: [
            {
              name: 'staging',
              isProd: false
            },
            {
              name: 'production',
              isProd: true
            }]
          }
        }
      },

      {
        id: 'bb 2',
        order: 0,
        name: 'Github',
        type: 'Repo',
        runtime: 'Github',
        status: 'pending',
        isPrivate: false,
        resource: 'Github',
        display: {
          mode: 'auto'
        }
      }
    ],
    connections: [{
      from: 'bb 1',
      to: 'bb 2'
    }]
  };

  const classes = useStyles();
  const [components, setComponents] = React.useState(buildingBlocks.components);
  const [connections, setConnections] = React.useState(buildingBlocks.connections);
  const [selectedComponent, selectComponent] = React.useState(null);
  const [newAppDialogOpen, setNewAppDialogOpen] = React.useState(false);

  const componentWidth = 180;
  const componentHeight = 50;

  const handleNewBbClick = () => {
    setNewAppDialogOpen(true);
  }

  const handleComponentClick = (component) => {
    selectComponent(component);
  }

  const handleAddonCreate = (metadata) => {
    let addonComponent = {
      id: metadata.addon.id,
      name: metadata.addon.name,
      order: OrderNewComponent(components, metadata.addon.type),
      type: metadata.addon.type,
      runtime: metadata.addon.runtime,
      status: metadata.addon.status,
      isPrivate: metadata.addon.isPrivate,
      resource: metadata.addon.resource,
      display: {
          mode: 'auto',
          width: componentWidth,
          height: componentHeight
      }
    }

    setComponents(
      components.concat([addonComponent])
    );

    let connection = {
        from: metadata.component.id,
        to: metadata.addon.id
    };

    setConnections(
      connections.concat([connection])
    );
  }

  const handleComponentCreate = (newComponents) => {
    setNewAppDialogOpen(false);
    setComponents(components.concat(newComponents));
  }

  const handleComponentChange = (targetComponent) => {
    let filtered = components.filter((element) => {
      return element.id !== targetComponent.id;
    });

    setComponents(filtered.concat([targetComponent]));
  }

  // Work out where the componets are
  components.forEach(component=> {
    if (!component.display.width) {
      component.display.width = componentWidth;
      component.display.height = componentHeight;
    }

    if (component.display.mode === 'auto') {
      let componentLocation = PositionComponent(component, window.innerWidth - 300);

      component.display.x = componentLocation.x;
      component.display.y = componentLocation.y;
    }
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NewAppDialog open={newAppDialogOpen} onCreate={handleComponentCreate}/>
      <AppBar position="static" className={classes.appBar} elevation={0}>
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
      <main className={classes.content}>
        <div style={{width: '100%' }}>
          <Box display='flex' flexDirection='row'>
            <CanvasPane 
              components={components} 
              connections={connections}
              selectedComponent={selectedComponent}
              onClickComponent={handleComponentClick} />
            <Box className={classes.sidebar}>
              { selectedComponent
                ? <div>
                    <ComponentPropertyPane selectedComponent={selectedComponent} onComponentChange={handleComponentChange} />
                    <DevopsPane component={selectedComponent} />
                    <AddonPane component={selectedComponent} onCreate={handleAddonCreate}/>
                  </div>
                : <Typography className={classes.title} align='center'>
                    Select a component...
                  </Typography>
              }
            </Box>
          </Box>
        </div>
      </main>
    </div>
  );
}
