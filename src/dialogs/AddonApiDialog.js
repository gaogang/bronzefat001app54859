import React from 'react';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import {v4 as uuidv4} from 'uuid'

export default (props) => {
    const {onClose, open} = props;

    const handleClose = () => {
        onClose({
            id: uuidv4(),
            name: name,
            runtime: runtime,
            type: 'app'
        });
    }

    const onRuntimeChange = (e) => {
        setRuntime(e.target.value);
    }

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const [name, setName] = React.useState('');
    const [runtime, setRuntime] = React.useState('');

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="addon-api">
            <DialogTitle id="addon=api">Add-on - Api</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    id="name"
                    label="Add-on name"
                    onChange={onNameChange}
                    fullWidth
                />
                <TextField
                    id="runtime"
                    label="Runtime"
                    onChange={onRuntimeChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
                Create
            </Button>
            </DialogActions>
        </Dialog>
    );
}