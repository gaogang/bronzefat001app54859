import React from 'react';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    info: {
        fontFamily: 'calibri',
        fontSize: 14
      },
    
      title: {
        flexGrow: 1,
        fontFamily: 'calibri',
        fontSize: 16
      }
}));

export default (props) => {
    const classes = useStyles();
    const {selectedComponent} = props;

    return (
    <div>
        <Typography className={classes.title} align='center'>
            {selectedComponent.name}
        </Typography>
        <Typography className={classes.info} color="textSecondary" align='center'>
            ({selectedComponent.type})
        </Typography>
        <Divider />
        <Box style={{marginTop: 20}}>
            <Grid container spacing={1}>
            <Grid item xs={4}>
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
            <Grid container spacing={1}>
            <Grid item xs={4}>
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
            <Grid container spacing={1}>
            <Grid item xs={4}>
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
            <Grid container spacing={1}>
            <Grid item xs={4}>
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
    </div>
)}