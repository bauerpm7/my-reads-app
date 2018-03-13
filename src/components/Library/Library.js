import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import BookShelf from '../BookShelf';
import { withStyles } from 'material-ui/styles';
import { Icon } from 'material-ui';
import { Link } from 'react-router-dom';
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

class Library extends Component {
  getBookFromShelf(books, bookshelf) {
    return books.filter(book => book.shelf === bookshelf);
  }

  render() {
    const { books, updateBook, classes } = this.props;

    return (
      <Fragment>
        <LibraryHeader />
        <div className={classes.library}>
          <BookShelf
            books={this.getBookFromShelf(books, 'currentlyReading')}
            updateBook={updateBook}
            bookShelfName="Currently Reading"
          />
          <BookShelf
            books={this.getBookFromShelf(books, 'wantToRead')}
            updateBook={updateBook}
            bookShelfName="Want To Read"
          />
          <BookShelf
            books={this.getBookFromShelf(books, 'read')}
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Library);
