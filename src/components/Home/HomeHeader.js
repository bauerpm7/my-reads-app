//Vendor
import React from 'react';
import { Link } from 'react-router-dom';

//PropTypes
import PropTypes from 'prop-types';

//Material-ui Components
import { withStyles } from 'material-ui/styles';
import { Icon, Typography, Toolbar, AppBar } from 'material-ui';

/**
 * JSS styles for Home Page Header
 */
const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 10
  },
  link: {
    color: 'inherit'
  },
  appBar: {
    boxShadow: 'none'
  }
};

/**
 * Render the HomeHeader Component
 */
function HomeHeader(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <a
            href="https://github.com/bauerpm7/my-reads-app"
            className={classes.link}
            aria-label="my github repo"
          >
            <Icon>code</Icon>
          </a>
          <Typography className={classes.flex} />
          <Link to="/library" className={classes.link} aria-label="library">
            <Icon className={classes.icon}>library_books</Icon>
          </Link>
          <Link to="/search" className={classes.link} aria-label="search">
            <Icon className={classes.icon}>search</Icon>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

HomeHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomeHeader);
