
import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';
import { searchTerms } from '../SearchTerms';
import { search } from '../utils/BooksAPI';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import { Button, Icon} from 'material-ui'
import { withStyles } from 'material-ui/styles'
import jss from 'jss'


const styles = theme => ({
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 50,
    width: '100%'
  }
})


// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : searchTerms.filter(term =>
    term.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);

class SearchBar extends Component {
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

    const {libraryBooks} = this.props;
    let searchQuery= query.trim();

    if (searchQuery === '') {
            this.setState({ searchResults: [] });
            return;
        };

    if(searchTerms.includes(searchQuery)) {
      search(searchQuery, 10).then(searchResults => {
      if (searchResults && searchResults.length) {
        let normalizedBooks = searchResults.map((book) => {
          let bookInLibrary;
          libraryBooks.map((libraryBook) => {
            if(libraryBook.id===book.id) {
              bookInLibrary = libraryBook;
            }
          })
          book.shelf = bookInLibrary ? bookInLibrary.shelf : 'none'
          return book
        });
        this.setState({ searchResults: normalizedBooks });
        }
      })
    }
  }

  getBookFromShelf(books, bookshelf) {
        return books.filter((book) => book.shelf === bookshelf);
    }

  render() {
    const { value, searchResults, suggestions } = this.state;
    const { updateBook, classes } = this.props
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search by title or author',
      value,
      onChange: this.onChange
    };
    console.log(searchResults)

    // Finally, render it!
    return (
      <div>
        <div className={classes.searchContainer}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          <Button
            variant='raised' 
            color='secondary'
            onClick={(event) => (this.onSearch(value))}
          ><Icon>search</Icon> Search</Button> 
        </div>
        <BookShelf
          books ={this.getBookFromShelf(searchResults, 'none')}
          updateBook = {updateBook}
          bookShelfName = "Search Results"
        />
      </div>
    );
  }
}
SearchBar.propTypes= {
  updateBook: PropTypes.func,
  classes: PropTypes.object.isRequired
}

export default withStyles (styles)(SearchBar)