//Vendor
import React, { Fragment, Component } from 'react';

//Components
import { searchTerms } from '../../SearchTerms';
import BookShelf from '../BookShelf';
import SearchHeader from './SearchHeader';

// BooksAPI
import * as BooksAPI from '../../utils/BooksAPI';

//prop-types
import PropTypes from 'prop-types';

//material-ui
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
  bookshelfContainer: {
    paddingBottom: 120
  },
  input: {
    fontSize: 24,
    width: 300,
    textAlign: 'center',
    padding: 10
  }
});

/**
 *  Search Component Path /search
 */
class Search extends Component {
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
  /**
   * Render Search Bar and Results
   */
  render() {
    const { searchResults, search } = this.state;
    const { updateBook, classes } = this.props;

    return (
      <Fragment>
        <SearchHeader />
        <div className={classes.searchContainer}>
          <input
            onChange={this.handleChange.bind(this)}
            type="text"
            placeholder="Search by title or author"
            className={classes.input}
            autoFocus
          />
        </div>
        <div className="search-books-results">
          <BookShelf
            books={this.getBookFromShelf(searchResults, 'none')}
            updateBook={updateBook}
            bookShelfName="Search Results"
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
