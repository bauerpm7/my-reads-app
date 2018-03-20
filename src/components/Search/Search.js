//Vendor
import React, { Fragment, Component } from 'react';

//Components
import BookShelf from '../BookShelf';
import SearchHeader from './SearchHeader';
import SearchTermsModal from './searchTermsModal';

// BooksAPI
import * as BooksAPI from '../../utils/BooksAPI';

//prop-types
import PropTypes from 'prop-types';

//material-ui
import { withStyles } from 'material-ui/styles';
import { Button, Typography } from 'material-ui';

/**
 * JSS Styles
 */
const styles = theme => ({
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 120,
    width: '100%',
    height: 50
  },
  bookshelfContainer: {
    paddingBottom: 120,
    paddingLeft: 30,
    paddingRight: 30
  },
  input: {
    fontSize: 24,
    width: 280,
    textAlign: 'center',
    padding: 10,
    borderColor: '#A3AEBB',
    borderWidth: 2
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  button: {
    marginTop: 20
  },
  trouble: {
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: 40,
    textAlign: 'center'
  }
});

/**
 *  Search Component Path /search
 */
class Search extends Component {
  state = {
    search: '', //this is the user's input
    searchResults: [], //response from the server, if any
    isOpen: false
  };

  /**
   * toggle state of modal
   */
  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  /**
   * Submits the search query to the search API, if the search results are not already
   * in the library, it pushes the search results to an array for rendering.
   *
   */
  handleSubmit = () => {
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
  };

  /**
   * When the search input changes the state of 'search' is changed to the new
   * search input and handleSubmit is called
   * @param  {event} e search input changes
   */
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

  /**
   * Render Search Bar and Results
   */
  render() {
    const { searchResults } = this.state;
    const { updateBook, classes, getBookFromShelf } = this.props;

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
        <Typography
          variant="subheading"
          component="h3"
          className={classes.trouble}
        >
          Having trouble finding what you're looking for? Check out the list of
          available search terms.
        </Typography>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant="raised"
            onClick={this.toggleModal}
          >
            Search Terms
          </Button>
          <SearchTermsModal show={this.state.isOpen} onClose={this.toggleModal}>
            Search Terms
          </SearchTermsModal>
        </div>
        <div className={classes.bookshelfContainer}>
          <BookShelf
            books={getBookFromShelf(searchResults, 'none')}
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
