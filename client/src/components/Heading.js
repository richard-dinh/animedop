import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import PolicyIcon from '@material-ui/icons/Policy'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Search from './Searchbar.js'

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    //backgroundColor: theme.palette.background.paper,
    //backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  background: {
    backgroundColor: '#4caf50',
  },
}))

const Heading = () => {
  const classes = useStyles()
  return (
    <>
      <AppBar position='relative' className={classes.background}>
        <Toolbar>
          <PolicyIcon className={classes.icon} />
          <Typography variant='h6' color='inherit' noWrap>
            Animedop
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.heroContent}>
        <Container maxWidth='sm'>
          <Typography
            component='h1'
            variant='h2'
            align='center'
            color='textPrimary'
            gutterBottom
          >
            Animedop
          </Typography>
          <Typography
            variant='h5'
            align='center'
            color='textSecondary'
            paragraph
          >
            Search supports English and Japanese titles!
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify='center'>
              {/* Search Bar here */}
              <Search />
            </Grid>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Heading
