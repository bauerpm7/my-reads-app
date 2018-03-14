//Vendor
import React, { Component } from 'react';

//prop-types
import PropTypes from 'prop-types';

//Components
import Book from './Book';

//material-ui
import { Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';

/**
 * JSS Styles
 */
const styles = theme => ({
  shelfName: {
    color: 'black',
    margin: 30,
    marginTop: 50,
    textAlign: 'center'
  }
});

/**
 * BookShelf component
 */
class BookShelf extends Component {
  /**
   * renders the BookShelf Component
   * @param {array} books passes in the array of all users books
   * @param {string} bookShelfName the title of the bookshelf
   * @param {func} updateBook function to update book after changing shelf
   * @param {object} classes JSS styles
   */
  render() {
    const { books, bookShelfName, updateBook, classes } = this.props;
    return (
      <div>
        <Typography
          className={classes.shelfName}
          component="h2"
          variant="display1"
        >
          {bookShelfName}
        </Typography>
        <Grid container justify="center" spacing={40}>
          {books.map(book => (
            <Grid item key={book.id}>
              <Book
                book={book}
                updateBook={updateBook}
                className={classes.book}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

BookShelf.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BookShelf);
