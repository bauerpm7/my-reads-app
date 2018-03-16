//Vendor
import React, { Fragment, Component } from 'react';
// import Autosuggest from 'react-autosuggest';

import * as BooksAPI from '../../utils/BooksAPI';
import Book from '../Book';

//Components
import { searchTerms } from '../../SearchTerms';
import BookShelf from '../BookShelf';
import SearchHeader from './SearchHeader';

// BooksAPI
// import { search } from '../../utils/BooksAPI';

//prop-types
import PropTypes from 'prop-types';

//material-ui
// import { Button, Icon } from 'material-ui';
import { withStyles } from 'material-ui/styles';

/**
 * JSS Styles
 */
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

/**
 * Teach Autosuggest how to calculate suggestions for any given input value.
 * @param  {string} value the input string
 * @return {array}       suggestions from the allowed search terms
 */
// const getSuggestions = value => {
//   const inputValue = value.trim().toLowerCase();
//   const inputLength = inputValue.length;

//   return inputLength === 0
//     ? []
//     : searchTerms.filter(
//         term => term.toLowerCase().slice(0, inputLength) === inputValue
//       );
// };

//
/**
 * When suggestion is clicked, Autosuggest needs to populate the input
 * based on the clicked suggestion. Teach Autosuggest how to calculate the
 * input value for every given suggestion.
 */
// const getSuggestionValue = suggestion => suggestion;

/**
 * Renders auto suggestions.
 * @param  {string} single suggestion from suggestions array
 */
// const renderSuggestion = suggestion => <div>{suggestion}</div>;

/**
 *  Search Component Path /search
 */
class Search extends Component {
  // constructor() {
  //   super();

  /**
   * Autosuggest is a controlled component.
   * This means that you need to provide an input value
   *  and an onChange handler that updates this value (see below).
   *  Suggestions also need to be provided to the Autosuggest,
   * and they are initially empty because the Autosuggest is closed.
   */
  //   this.state = {
  //     value: '',
  //     suggestions: [],
  //     searchResults: []
  //   };
  // }

  // onChange = (event, { newValue }) => {
  //   this.setState({
  //     value: newValue
  //   });
  // };

  /** Autosuggest will call this function every time you need to update suggestions.
   * You already implemented this logic above, so just use it.
   */
  // onSuggestionsFetchRequested = ({ value }) => {
  //   this.setState({
  //     suggestions: getSuggestions(value)
  //   });
  // };

  /**
   * Autosuggest will call this function every time you need to clear suggestions.
   */
  // onSuggestionsClearRequested = () => {
  //   this.setState({
  //     suggestions: []
  //   });
  // };

  //sort books by shelf
  // getBookFromShelf(books, bookshelf) {
  //   return books.filter(book => book.shelf === bookshelf);
  // }
  state = {
    search: '', //this is the user's input
    searchResults: [] //response from the server, if any
  };

  handleSubmit() {
    const { libraryBooks } = this.props;
    const { search } = this.state;
    let query = search.trim();
    //if the search string is empty, empty the search results
    if (query === '') {
      this.setState({ searchResults: [] });
      return;
    }

    BooksAPI.search(query, 10).then(searchResults => {
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

  // handleSubmit () {
  //   const { libraryBooks } = this.props;
  //   let query = search.trim();
  //   if (searchQuery === '') {
  //     this.setState({ searchResults: [] });
  //     return;
  //   }
  //   BooksAPI.search( query )
  //     .then((data) => {
  //       if (data) { //to guard against undefined
  //         this.setState({
  //           searchResults: data || []
  //         });
  //       }
  //     });
  //   }
  // }

  handleChange(e) {
    e.preventDefault();

    this.setState(
      {
        search: e.target.value
      },
      () => {
        this.handleSubmit(); // submits forms so user can see prelimirary results
      }
    );
  }

  getBookFromShelf(books, bookshelf) {
    return books.filter(book => book.shelf === bookshelf);
  }

  render() {
    const { searchResults, search } = this.state;
    const { updateBook, classes } = this.props;
    /**
     * Autosuggest will pass through all these props to the input.
     //  */
    // const inputProps = {
    //   placeholder: 'Search by title or author',
    //   value,
    //   onChange: this.onChange
    // };
    // console.log(searchResults);

    /**
     * Render Autosuggest
     */
    return (
      <Fragment>
        <SearchHeader />
        <div className={classes.searchContainer}>
          <div className="search-books-bar">
            <div className="search-books-input-wrapper">
              <input
                onChange={this.handleChange.bind(this)}
                type="text"
                placeholder="Search by title or author"
              />
            </div>
          </div>
          <div className="search-books-results">
            <BookShelf
              books={this.getBookFromShelf(searchResults, 'none')}
              updateBook={updateBook}
              bookShelfName="Currently Reading"
            />
          </div>
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
