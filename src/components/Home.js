import React, { Component, Fragment } from 'react';
import { withStyles } from 'material-ui/styles';
import { Typography, Icon, Button } from 'material-ui';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Footer from './Footer';

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
  },
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

class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.mainContainer}>
          <Typography
            variant="display2"
            component="h1"
            className={classes.title}
          >
            {' '}
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
              and react-router. Components are styled using CSS style sheets,
              CSS in JS (JSS) and{' '}
              <a className={classes.links} href="https://material-ui-next.com/">
                Material UI
              </a>.
            </p>
          </Typography>
        </div>
        <Footer />
      </Fragment>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
