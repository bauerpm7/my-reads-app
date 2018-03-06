import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { AppBar, Toolbar, Typography, Grid } from 'material-ui';


const styles = {
  icon: {
    color: 'inherit',
    paddingRight: 30
  },

  header: {
    paddingTop:15,
    height: 100
  }
};


function LibraryHeader(props) {
  const { classes } = props;
  return (
    <div>
      <AppBar className={classes.header} position="static">
        <Toolbar>
          <Typography
          className={classes.icon}>
            <span className="glyphicons glyphicons-book-open x2"></span>
          </Typography>
          <i class="material-icons">search</i>
        </Toolbar>
      </AppBar>
    </div>
  );
}

LibraryHeader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LibraryHeader);