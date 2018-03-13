import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Icon, Typography } from 'material-ui';
import logo from '../containers/logo.svg';

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: '#3f51b5',
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    width: '100%'
  },
  flex: {
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14
  },
  logo: {
    height: 20
  }
};

function Footer(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography className={classes.flex}>
        Created in<a href="https://reactjs.org/" aria-label="react">
          <img src={logo} alt="react" className={classes.logo} />
        </a>
        by Michael Bauer
      </Typography>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
