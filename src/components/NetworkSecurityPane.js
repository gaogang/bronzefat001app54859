import React from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  info: {
      fontSize: 14
    }
}));

export default (props) => {
    const classes = useStyles();
    
    const {selectedComponent} = props;

    return (
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
    );
}