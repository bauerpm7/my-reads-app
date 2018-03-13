import React, { Fragment, Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { searchTerms } from '../../SearchTerms';
import { search } from '../../utils/BooksAPI';
import PropTypes from 'prop-types';
import BookShelf from '../BookShelf';
import { Button, Icon } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 120,
    width: '100%',
    flexWrap: 'wrap'
  },
  button: {
    marginTop: 30
  },
  bookshelfContainer: {
    paddingBottom: 120
  }
});

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : searchTerms.filter(
        term => term.toLowerCase().slice(0, inputLength) === inputValue
      );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion}</div>;

class Search extends Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      searchResults: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  onSearch = (query: string) => {
    const { libraryBooks } = this.props;
    let searchQuery = query.trim();
    //if the search string is empty, empty the search results
    if (searchQuery === '') {
      this.setState({ searchResults: [] });
      return;
    }
    //make sure the search query is in the list of search terms
    if (searchTerms.includes(searchQuery)) {
      //get results from the API
      search(searchQuery, 10).then(searchResults => {
        //only add books to the search results if they aren't already in the library
        if (searchResults && searchResults.length) {
          let normalizedBooks = searchResults.map(book => {
            let bookInLibrary;
            libraryBooks.map(libraryBook => {
              if (libraryBook.id === book.id) {
                bookInLibrary = libraryBook;
              }
              return null;
            });
            //set shelf property of books in search results to 'none'
            book.shelf = bookInLibrary ? bookInLibrary.shelf : 'none';
            return book;
          });
          //add search results to the searchResults array.
          this.setState({ searchResults: normalizedBooks });
        }
      });
    }
  };
  //sort books by shelf
  getBookFromShelf(books, bookshelf) {
    return books.filter(book => book.shelf === bookshelf);
  }

  render() {
    const { value, searchResults, suggestions } = this.state;
    const { updateBook, classes } = this.props;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search by title or author',
      value,
      onChange: this.onChange
    };
    console.log(searchResults);

    // Finally, render it!
    return (
      <Fragment>
        <div className={classes.searchContainer}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            role="form"
          />
          <Button
            aria-label="search"
            className={classes.button}
            variant="raised"
            color="secondary"
            onClick={event => this.onSearch(value)}
          >
            <Icon>search</Icon> Search
          </Button>
        </div>
        <div className={classes.bookshelfContainer}>
          <BookShelf
            books={this.getBookFromShelf(searchResults, 'none')}
            updateBook={updateBook}
            bookShelfName="Search Results"
            className={classes.bookshelf}
          />
        </div>
      </Fragment>
    );
  }
}
Search.propTypes = {
  updateBook: PropTypes.func,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Search);
