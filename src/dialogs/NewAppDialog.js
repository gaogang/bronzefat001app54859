import React from 'react';
import Button from '@material-ui/core/Button'
import createNewComponent from '../ReferenceModels/CreateComponents'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField';

export default (props) => {
    const { open, onCreate } = props;
    const [appName, setAppName] = React.useState('app');
    const [runtime, setRuntime] = React.useState('');

    const handleClose = () => {
    }

    const handleCreate = () => {
        onCreate(createNewComponent(appName, 'app', runtime))
    }

    const handleRuntimeChange = event => {
        setRuntime(event.target.value);
    }

    const handleAppNameChange = event => {
        setAppName(event.target.value);
    }

    return (
        <Dialog open={open} aria-labelledby="add-on" maxWidth='sm' fullWidth={true}>
            <DialogTitle id="addon=api">New App</DialogTitle>
            <DialogContent>
                <div>
                    <TextField
                        id="appName"
                        label="Name"
                        helperText="Enter the name of the app"
                        autoFocus
                        defaultValue="app"
                        fullWidth={true}
                        onChange={handleAppNameChange}
                    />
                </div>
                <div>
                    <TextField
                        id="runtime"
                        label="Runtime"
                        select
                        helperText="Enter the runtime of the app"
                        fullWidth={true}
                        onChange={handleRuntimeChange}>
                        <MenuItem key="node" value="node">Node</MenuItem>
                        <MenuItem key="react" value="react">React</MenuItem>
                    </TextField>
                </div>
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