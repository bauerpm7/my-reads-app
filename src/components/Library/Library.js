//Vendor
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

//prop-types
import PropTypes from 'prop-types';

//material-ui
import { withStyles } from 'material-ui/styles';
import { Icon } from 'material-ui';

//Components
import BookShelf from '../BookShelf';
import LibraryHeader from './LibraryHeader';

const styles = theme => ({
  library: {
    marginTop: 120,
    paddingBottom: 120
  },
  addBooks: {
    position: 'fixed',
    bottom: 60,
    right: 40,
    fontSize: 60,
    [theme.breakpoints.down('xs')]: {
      fontSize: 48,
      right: 25,
      bottom: 50
    }
  }
});

/**
 * Library Component Path /
 */
class Library extends Component {
  /**
   * Renders the library component
   * @param {object} classes passes in the styles
   * @param {func} upDateBook from {@link App#updateBook}
   * @param { array } books passes in book array from App Component
   * @return {html} returns html for the library component
   */
  render() {
    const { books, updateBook, classes, getBookFromShelf } = this.props;

    return (
      <Fragment>
        <LibraryHeader />
        <div className={classes.library}>
          <BookShelf
            books={getBookFromShelf(books, 'currentlyReading')}
            updateBook={updateBook}
            bookShelfName="Currently Reading"
          />
          <BookShelf
            books={getBookFromShelf(books, 'wantToRead')}
            updateBook={updateBook}
            bookShelfName="Want To Read"
          />
          <BookShelf
            books={getBookFromShelf(books, 'read')}
            updateBook={updateBook}
            bookShelfName="Read"
          />
          <Link to="/search">
            <Icon
              className={classes.addBooks}
              color="primary"
              aria-label="search"
            >
              add_circle
            </Icon>
          </Link>
        </div>
      </Fragment>
    );
  }
}

Library.propTypes = {
  updateBook: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired
};

export default withStyles(styles)(Library);
