import React from 'react';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AppBar from '@material-ui/core/AppBar';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import ComponentProperties from '../components/ComponentProperties'
import CssBaseline from '@material-ui/core/CssBaseline';
import DescriptionIcon from '@material-ui/icons/Description';
import Divider from '@material-ui/core/Divider';
import GenericAddonDialog from '../dialogs/GenericAddonDialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PublishIcon from '@material-ui/icons/Publish';
import grey from '@material-ui/core/colors/grey';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Stage, Layer, Group, Rect, Text, Arrow } from 'react-konva';

import ConnectComponents from '../utils/ConnectComponents';
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
    fontFamily: 'calibri',
    fontSize: 14
  },

  sidebar: {
    background: grey[200],
    width: 300, 
    padding: 10
  },

  title: {
    flexGrow: 1,
    fontFamily: 'calibri',
    fontSize: 16
  }
}));

const addons = [
    {
      name: 'Api',
      label: 'Api',
      type: 'app',
      runtime: 'node'
    },
    {
      name: 'cosmosdb',
      label: 'Cosmos DB',
      type: 'db',
      runtime: 'SQL'
    }
  ];

export default () => {
  const classes = useStyles();
  const [addonDialogOpen, setAddonDialogOpen] = React.useState(false);
  const [selectedComponent, selectComponent] = React.useState(null);

  const componentWidth = 150;
  const componentHeight = 50;

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
        display: {
          mode: 'auto'
        }
      },
      {
        id: 'bb 2',
        order: 1,
        name: 'customer Api',
        type: 'app',
        runtime: 'node',
        status: 'pending',
        isPrivate: true,
        display: {
          mode: 'auto'
        }
      },
      {
        id: 'bb 3',
        order: 0,
        name: 'customer db',
        type: 'db',
        runtime: 'cosmos',
        status: 'pending',
        isPrivate: true,
        display: {
          mode: 'auto'
        }
      }
    ],
    connections: [
      {
        from: 'bb 1',
        to: 'bb 2'
      },
      {
        from: 'bb 2',
        to: 'bb 3'
      }
    ]
  };

  const [components, setComponents] = React.useState(buildingBlocks.components);
  const [connections, setConnections] = React.useState(buildingBlocks.connections);
  const [addon, setAddon] = React.useState('');

  const handleNewBbClick = () => {
        alert('create new bb');
  }

  const handleAddonClick = (e, type) => {
    setAddon(type);
    setAddonDialogOpen(true);
  }

  const handleAddonCreate = (addon) => {
    setAddonDialogOpen(false);

    if (!addon) {
      return;
    }

    let component = {
        id: addon.id,
        name: addon.name,
        order: OrderNewComponent(components, addon.type),
        type: addon.type,
        runtime: addon.runtime,
        status: 'pending',
        isPrivate: false,
        display: {
            mode: 'auto',
            width: componentWidth,
            height: componentHeight
        }
      };

    setComponents(
      // Add Api
      components.concat([component])
    );
  }

  const handleAddonDialogClose = () => {
    setAddonDialogOpen(false);
  }

  const handleComponentClick = (e, component) => {
    selectComponent(component);
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

  console.log('Creating connections...');
  let connectionLines = ConnectComponents(connections, components);
  console.log(`${connectionLines.length} connection(s) created`);

  return (
    <div className={classes.root}>
      <CssBaseline />
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
      <GenericAddonDialog addon={addon} open={addonDialogOpen} onClose={handleAddonDialogClose} onCreate={handleAddonCreate}/>
      <main className={classes.content}>
        <div style={{width: '100%' }}>
          <Box display='flex' flexDirection='row'>
            <Stage width={window.innerWidth - 300 } height={window.innerHeight}>
              <Layer>
                {
                  connectionLines.map((connectionLine, i) => {
                    return (
                      <Arrow
                        points={[connectionLine.from.x, connectionLine.from.y, connectionLine.to.x, connectionLine.to.y]}
                        pointerWidth={7}
                        fill='gray'
                        stroke='gray'
                        strokeWidth={0.6} />
                    );
                  })
                }
              </Layer>
              <Layer>
              {
                components.map((component, i) => {
                    return (
                      <Group 
                        name={component.id}
                        draggable={true}
                        onClick={(e) => handleComponentClick(e, component)}>
                        <Rect
                          name={component.id}
                          x={component.display.x}
                          y={component.display.y}
                          width={component.display.width}
                          height={component.display.height}
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
                          x={component.display.x}
                          y={component.display.y + 3}
                          width={component.display.width}
                          />
                    </Group>
                  );
                })
              }
              </Layer>
            </Stage>
            <Box className={classes.sidebar}>
              { selectedComponent
                ? <div>
                    <ComponentProperties selectedComponent={selectedComponent} />
                    <Box style={{marginTop: 20}}>
                      <Typography className={classes.info} align='left'>
                        Add-ons
                      </Typography>
                      <Divider />
                      <List component="nav">
                        {
                          addons.map((addon, i) => {
                            return (
                              <ListItem button dense onClick={(e, type) => handleAddonClick(e, addon)}>
                                <ListItemIcon>
                                  <DescriptionIcon style={{fontSize: 16}} />
                                </ListItemIcon>
                                <ListItemText disableTypography primary={<Typography className={classes.info}>{addon.label}</Typography>} />
                              </ListItem>
                            )})
                        }
                      </List>
                    </Box>
                  </div>
                : <Typography className={classes.title} variant="h5" component="h2" align='center'>
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