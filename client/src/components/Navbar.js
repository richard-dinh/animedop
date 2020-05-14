import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import PolicyIcon from '@material-ui/icons/Policy';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  }
}))

const Navbar = () => {
  const classes = useStyles()
  return (
    <>
    <AppBar position="relative">
      <Toolbar>
        <PolicyIcon className={classes.icon} />
        <Typography variant="h6" color="inherit" noWrap>
          Animedop
          </Typography>
      </Toolbar>
    </AppBar>
    </>
  )
}

export default Navbar