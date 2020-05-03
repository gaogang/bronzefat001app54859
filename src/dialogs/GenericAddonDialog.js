import React from 'react';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import {makeStyles } from '@material-ui/core/styles';
import {v4 as uuidv4} from 'uuid'

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        fontFamily: 'calibri',
        fontSize: 16
      }
    }
));

export default (props) => {
    const classes = useStyles();
    const {onClose, onCreate, open, addon} = props;

    const handleClose = () => {
        onClose();
    }

    const handleCreate = () => {
        onCreate({
            id: uuidv4(),
            name: addon.name,
            label: addon.label,
            type: addon.type,
            runtime: addon.runtime
        });
    }

    return (
        <Dialog open={open} aria-labelledby="add-on" maxWidth='md' fullWidth={true}>
            <DialogTitle id="addon=api">Add-on</DialogTitle>
            <DialogContent>
                <Typography className={classes.info} color="textSecondary" align='center'>
                   {addon.label}
                </Typography>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="default">
                Cancel
            </Button>
            <Button onClick={handleCreate} color="primary">
                Create
            </Button>
            </DialogActions>
        </Dialog>
    );

}