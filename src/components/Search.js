import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import { withStyles } from 'material-ui/styles';
import { Paper } from 'material-ui';

const styles = {
  searchContainer: {
    position: 'fixed',
    top: 64,
    width: "100%",
    padding:20

  },
  searchBooks: {
    width:"100%",
    fontSize: "1.5em",
    border: 'none'
  }
  
}

class Search extends Component {

  state = {
    query: ''
  }
  render (){
    const {query} = this.state
    const { classes } = this.props
    return(
      <div>
      <Paper className={classes.searchContainer}>
        <input
          className={classes.searchBooks}
         type='text'
         placeholder='Search Books'
          value={query}
        />
     </Paper>
     </div>
    )
  }
};

Search.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Search);
