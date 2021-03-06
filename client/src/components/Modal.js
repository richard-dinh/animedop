import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Backdrop} from '@material-ui/core'
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import AnimeContext from '../utils/context/AnimeContext.js'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '4px solid #5E784D',
    // border: '4px solid #5D1D1D',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const SpringModal = children => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  //bring updateDisplayModal from AnimeContext
  const { updateNoResultsModal } = useContext(AnimeContext)

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('welcomeModal', true)
  };

  const handleCloseNoResults = () => {
    updateNoResultsModal(false)
  }
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={children.noResults ? handleCloseNoResults :handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">{children.title}</h2>
            <p id="spring-modal-description">{children.description}</p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default SpringModal