import React from 'react';
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    info: {
        fontSize: 14
    },

    info_hl: {
        fontSize: 14,
        fontWeight: "bold"
    },
    
    title: {
        flexGrow: 1,
        fontSize: 16
    }
}));

export default (props) => {
    const classes = useStyles();
    const { selectedComponent, onComponentChange } = props;

    const [open, openCloseDialog] = React.useState(false);
    const [componentNameTbc, setComponentNameTbc] = React.useState(selectedComponent.name);

    const handleEditName = () => {
        openCloseDialog(true);
    }

    const handleComponentNameChange = (event) => {
        setComponentNameTbc(event.target.value);
    }

    const handleCloseDialog = () => {
        openCloseDialog(false);
    }

    const handleUpdateName = () => {
        openCloseDialog(false);

        selectedComponent.name = componentNameTbc;
        onComponentChange(selectedComponent);
    }

    return (
    <div>
        <Dialog open={open} aria-labelledby="Name" maxWidth='md'>
            <DialogTitle id="addon=api">Name</DialogTitle>
            <DialogContent>
                <TextField
                    id="appName"
                    label="Name"
                    helperText="Enter the name of the selected component"
                    variant="outlined"
                    autoFocus
                    defaultValue={selectedComponent.name}
                    onChange={handleComponentNameChange}
                    />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseDialog} color="default">
                Cancel
            </Button>
            <Button onClick={handleUpdateName} color="primary">
                Update
            </Button>
            </DialogActions>
        </Dialog>
        <Box style={{marginTop: 20}}>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <Typography className={classes.info_hl}>
                        Name:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography className={classes.info}>
                        {selectedComponent.name}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <IconButton size="small" aria-label="edit" onClick={handleEditName}>
                        <EditIcon className={classes.info} />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <Typography className={classes.info_hl}>
                    Status:
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Typography className={classes.info}>
                    {selectedComponent.status}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <Typography className={classes.info_hl}>
                    Type:
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Typography className={classes.info}>
                    {selectedComponent.type}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <Typography className={classes.info_hl}>
                    Runtime:
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Typography className={classes.info}>
                    {selectedComponent.runtime}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    </div>
)}