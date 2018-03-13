import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { Icon } from 'material-ui';
import { Link } from 'react-router-dom';

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

function HomeHeader(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <a
            href="https://github.com/bauerpm7/my-reads-app"
            className={classes.link}
          >
            <Icon>code</Icon>
          </a>
          <Typography className={classes.flex} />
          <Link to="/library" className={classes.link}>
            <Icon className={classes.icon}>library_books</Icon>
          </Link>
          <Link to="/search" className={classes.link}>
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
