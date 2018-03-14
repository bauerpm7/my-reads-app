//Vendor
import React, { Component } from 'react';

//material-ui
import { withStyles } from 'material-ui/styles';
import { Typography } from 'material-ui';

//prop-types
import PropTypes from 'prop-types';

const styles = theme => ({
  descriptionContainer: {
    marginTop: 30,
    textAlign: 'center',
    margin: 30
  },
  description: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 20
    }
  },
  descriptionTitle: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 28
    }
  }
});

/**
 * Description Component
 * Extends the Component Class
 */
class Description extends Component {
  /**
   * Renders the Description Component
   * @return {[html]} returns html for the Description component
   */
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.descriptionContainer}>
        <Typography
          component="h2"
          variant="display1"
          className={classes.descriptionTitle}
        >
          About MyReads
        </Typography>
        <Typography variant="headline" className={classes.description}>
          <p>
            MyReads is a book tracking app built for Project #5 of the{' '}
            <a
              className={classes.links}
              href="https://www.udacity.com/course/front-end-web-developer-
            nanodegree--nd001"
            >
              Udacity Front End Web Developer Nanodegree Program.
            </a>{' '}
            It lets users search for books and sort them into shelves.
          </p>
          <p>
            {' '}
            It is a progressive web app built on{' '}
            <a
              className={classes.links}
              href="https://www.npmjs.com/package/create-react-app"
            >
              create-react-app
            </a>{' '}
            and react-router. Components are styled using CSS style sheets, CSS
            in JS (JSS) and{' '}
            <a className={classes.links} href="https://material-ui-next.com/">
              Material UI
            </a>.
          </p>
        </Typography>
      </div>
    );
  }
}

Description.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Description);
