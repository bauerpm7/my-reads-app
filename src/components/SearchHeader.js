import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { AppBar, Toolbar, Typography, Icon } from 'material-ui';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
    fontSize: 24,
    color: 'white'
  },
  icon: {
    paddingLeft: 10,
    paddingRight: 10
  },
  link: {
    color: 'inherit'
  }
};

function SearchHeader(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" className={classes.flex}>
            MyReads - Search
          </Typography>
          <Link to="/" className={classes.link}>
            <Icon className={classes.icon} aria-label="home">
              home
            </Icon>
          </Link>
          <Link to="/library" className={classes.link}>
            <Icon className={classes.icon} aria-label="library">
              library_books
            </Icon>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

SearchHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchHeader);
