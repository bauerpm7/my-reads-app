//Vendor
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Material-ui Components
import { withStyles } from 'material-ui/styles';
import { Typography, Icon, Button } from 'material-ui';

//prop-types component
import PropTypes from 'prop-types';

/**
 * JSS Styles
 */
const styles = theme => ({
  title: {
    color: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    [theme.breakpoints.down('xs')]: {
      fontSize: 32
    }
  },
  mainContainer: {
    backgroundColor: '#3f51b5',
    minHeight: 400,
    width: '100%',
    paddingTop: 30,
    textAlign: 'center'
  },
  bookIcon: {
    color: 'white',
    fontSize: 180,
    paddingTop: 30
  },
  secondaryContainer: {
    display: 'flex'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: 30,
    width: '40%'
  },
  dummyContainter: {
    width: '30%'
  },
  links: {
    textDecoration: 'none',
    padding: 5
  },
  button: {
    width: 120
  }
});

/**
 * Welcome Component
 */
class Welcome extends Component {
  /**
   * Render the Welcome Component
   */
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainContainer}>
        <Typography variant="display2" component="h1" className={classes.title}>
          Welcome to MyReads
        </Typography>
        <Icon className={classes.bookIcon}>book</Icon>
        <div className={classes.secondaryContainer}>
          <div className={classes.dummyContainter} />
          <div className={classes.buttonContainer}>
            <Link to="/library" className={classes.links}>
              <Button
                className={classes.button}
                variant="raised"
                color="secondary"
                size="small"
              >
                My Library
              </Button>
            </Link>
            <Link to="/search" className={classes.links}>
              <Button
                className={classes.button}
                variant="raised"
                color="secondary"
                size="small"
              >
                Search
              </Button>
              <div className={classes.dummyContainter} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
Welcome.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Welcome);
