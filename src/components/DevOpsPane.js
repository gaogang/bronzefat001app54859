import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },

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
    
    const {component} = props;

    return (
      (component.resource === 'Function' || component.resource === 'AppServices') ? 
        <Box style={{marginTop: 20}}>
          <Typography className={classes.info} align='left'>
            Staging
          </Typography>
          <Divider />
          <FormControlLabel
            control={
                <Switch
                  name="stagingEnabled"
                  color="primary"
                  checked={component.devops.staging.enabled}
                />
            }
            label={<Typography className={classes.info} align='left'>Enable</Typography>}
            labelPlacement="start"
          />
          {
            component.devops.staging.enabled &&
            <div className={classes.buttonGroup}>
              <ButtonGroup size="small" color="primary" aria-label="outlined primary button group">
                {
                  component.devops.staging.stages.map((stage, i) => {
                  return (
                      <Button>{<Typography className={classes.info}>{stage.name}</Typography>}</Button>
                  )})
                }
              </ButtonGroup>
            </div>
          }
        </Box>
      : null
    );
}