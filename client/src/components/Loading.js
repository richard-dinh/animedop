import React from 'react'
import { makeStyles} from '@material-ui/core/styles'
import loadingGif from './../assets/raphtalia-spin.gif'
const useStyles = makeStyles((theme) => ({
  loading: {
    margin: '0 auto',
    display: 'block'
  }
}))

const Loading = () => {

  const classes = useStyles()
  return (
    <img className={classes.loading} src={loadingGif} alt='loading...' />
  )
}

export default Loading
