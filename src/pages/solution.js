import React from 'react';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddonApiDialog from '../dialogs/AddonApiDialog'
import AppBar from '@material-ui/core/AppBar';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline';
import DescriptionIcon from '@material-ui/icons/Description';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PublishIcon from '@material-ui/icons/Publish';
import Switch from '@material-ui/core/Switch';
import grey from '@material-ui/core/colors/grey';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Stage, Layer, Group, Rect, Text, Arrow } from 'react-konva';

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
    fontFamily: 'Roboto',
    fontSize: 14
  },

  sidebar: {
    background: grey[200],
    width: 300, 
    padding: 10
  },

  title: {
    flexGrow: 1,
    fontFamily: 'Roboto'
  }
}));

const addons = [
    {
      name: 'Api',
      label: 'Api'
    },
    {
      name: 'cosmosdb',
      label: 'Cosmos DB',
    },
    {
      name: 'keyvault',
      label: 'Key Vault'
    },
    {
      name: 'sfconnect',
      label: 'Salesforce Connect'
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
          key: '3c639eef-fb77-47fa-9176-3fd6f52f5430',
            id: 'bb 1',
            orderId: 0,
            name: 'windermere',
            type: 'app',
            runtime: 'reactjs',
            status: 'pending',
            isPrivate: false,
            position: {
              mode: 'auto'
            }
        },
        {
          key: '12e5a4da-1be6-4a77-a644-87eae218eb7b',
            id: 'bb 2',
            orderId: 1,
            name: 'cosmos db',
            type: 'db',
            runtime: 'cosmosdb',
            status: 'pending',
            isPrivate: true,
            position: {
              mode: 'auto'
            }
        },
        {
          key: '74989886-609b-447c-8593-a06c8b95c932',
          id: 'bb 3',
          orderId: 0,
          name: 'keyvault',
          type: 'store',
          runtime: 'keyvault',
          status: 'pending',
          isPrivate: true,
          position: {
              mode: 'auto'
          }
      },
      ]};

  const [components, setComponents] = React.useState(buildingBlocks.components);

  const handleNewBbClick = () => {
        alert('create new bb');
  }

  const handleAddonClick = (e, type) => {
    if (type === 'Api') {
      setAddonDialogOpen(true);
    } else {
      alert('sorry, we are still under construction!!')
    }
  }

  const handleAddonDialogClose = (metadata) => {
    setAddonDialogOpen(false);

    if (!metadata) {
      return;
    }

    alert(JSON.stringify(metadata));

    setComponents(
      // Add Api
      buildingBlocks.components.concat([{
              id: metadata.id,
              orderId: 1,
              name: metadata.name,
              type: metadata.type,
              runtime: metadata.runtime,
              status: 'pending',
              isPrivate: false,
              position: {
                  mode: 'auto'
              }}])
    );
  }

  const handleComponentClick = (e, component) => {
    selectComponent(component);
  }

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
      <AddonApiDialog open={addonDialogOpen} onClose={handleAddonDialogClose} />
      <main className={classes.content}>
        <div style={{width: '100%' }}>
          <Box display='flex' flexDirection='row'>
            <Stage width={window.innerWidth - 300 } height={window.innerHeight}>
              <Layer>
              {
                components.map((component, i) => {
                    let componentLocation = PositionComponent(
                      component, 
                      window.innerWidth - 300, 
                      componentWidth, 
                      componentHeight);

                    return (
                      <Group 
                        name={component.id}
                        draggable={true}
                        onClick={(e) => handleComponentClick(e, component)}>
                        <Rect
                          name={component.id}
                          x={componentLocation.x}
                          y={componentLocation.y}
                          width={componentWidth}
                          height={componentHeight}
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
                          x={componentLocation.x}
                          y={componentLocation.y + 3}
                          width={componentWidth}
                          >
                        </Text>
                    </Group>);
                })
              }
              </Layer>
            </Stage>
            <Box className={classes.sidebar}>
              { selectedComponent
                ? <div>
                    <Typography className={classes.title} variant="h5" component="h2" align='center'>
                      {selectedComponent.name}
                    </Typography>
                    <Typography className={classes.info} color="textSecondary" align='center'>
                      ({selectedComponent.type})
                    </Typography>
                    <Divider />
                    <Box style={{marginTop: 20}}>
                      <Grid container spacing={1}>
                        <Grid item xs={3}>
                          <Typography className={classes.info}>
                            Status:
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <Typography className={classes.info}>
                            {selectedComponent.status}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <Typography className={classes.info}>
                            Runtime:
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <Typography className={classes.info}>
                            {selectedComponent.runtime}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <Typography className={classes.info}>
                            Resource group:
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <Typography className={classes.info}>
                            {selectedComponent.resourceGroup}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <Typography className={classes.info}>
                            Subscription:
                          </Typography>
                        </Grid>
                        <Grid item xs>
                          <Typography className={classes.info}>
                            {selectedComponent.subscription}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box style={{marginTop: 20}}>
                      <Typography className={classes.info} align='left'>
                        Network security
                      </Typography>
                      <Divider />
                      <FormControlLabel
                        control={
                          <Switch
                            name="isPrivate"
                            color="primary"
                            checked={selectedComponent.isPrivate}
                          />
                        }
                        label={<Typography className={classes.info} align='left'>Internet facing:</Typography>}
                        labelPlacement="start"
                      />
                    </Box>
                    <Box style={{marginTop: 20}}>
                      <Typography className={classes.info} align='left'>
                        Add-ons
                      </Typography>
                      <Divider />
                      <List component="nav">
                        {
                          addons.map((addon, i) => {
                            return (
                              <ListItem button dense onClick={(e, type) => handleAddonClick(e, addon.name)}>
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