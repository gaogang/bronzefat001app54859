import React from 'react';
import Box from '@material-ui/core/Box';
import DescriptionIcon from '@material-ui/icons/Description';
import Divider from '@material-ui/core/Divider';
import GenericAddonDialog from '../dialogs/GenericAddonDialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const addons = [
    {
      name: 'Api',
      label: 'Api',
      type: 'service',
      runtime: 'node',
      resource: 'Function'
    },
    {
      name: 'cosmosdb',
      label: 'Cosmos DB',
      type: 'db',
      runtime: 'SQL',
      resource: 'CosmosDb'
    }
];

const useStyles = makeStyles((theme) => ({
    info: {
        fontSize: 14
      },
    
      title: {
        flexGrow: 1,
        fontSize: 16
      }
}));

export default (props) => {
    const classes = useStyles();
    
    const {component, onCreate} = props;

    const [addon, setAddon] = React.useState(null);
    const [addonDialogOpen, setAddonDialogOpen] = React.useState(false);

    const handleAddonClick = (e, type) => {
        setAddon(type);
        setAddonDialogOpen(true);
    }

    const handleAddonCreate = (addon) => {
        setAddonDialogOpen(false);
    
        if (!addon) {
          return;
        }

        onCreate({
          component: component,
          addon: {
            id: addon.id, 
            name: addon.name,
            type: addon.type,
            runtime: addon.runtime,
            status: 'pending',
            isPrivate: true,
            resource: addon.resource
          }
        });
      }
    
      const handleAddonDialogClose = () => {
        setAddonDialogOpen(false);
      }

    return (
      component.resource === 'Function' || component.resource === 'AppServices' ? 
        <div>
            <GenericAddonDialog 
                addon={addon} 
                open={addonDialogOpen} 
                onClose={handleAddonDialogClose} 
                onCreate={handleAddonCreate}
                />
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
        : null
    );
}