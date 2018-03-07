import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import { withStyles } from 'material-ui/styles';
import { Paper, Grid } from 'material-ui';
import { search } from '../utils/BooksAPI';
import { searchTerms } from '../SearchTerms';
import Book from './Book'

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
    searchResults: [],
  }

  onSearch = (query: string) => {
    if(searchTerms.includes(query)) {
      search(query).then(searchResults => {
        this.setState(
        { searchResults }
      )
      })
    }
  }

  render (){
    const {searchResults} = this.state
    const { updateBook, classes} = this.props
    console.log(searchResults)
    return(
      <div>
        <Paper className={classes.searchContainer}>
          <input
            className={classes.searchBooks}
            type='text'
            placeholder='Search Books'
            onChange={(event) => this.onSearch(event.target.value)}
          />
       </Paper>
       <Grid 
        container
        justify= 'center'
        spacing={40}
        >
            {searchResults.map((book) => (
              <Grid item>
              <Book
                book = {book}
                key = {book.id}
                updateBook = {updateBook}
                className={classes.book}
              />
              </Grid>
            ))}
        </Grid>
     </div>
    )
  }
};

Search.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Search);
