import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import { Grid } from 'material-ui'
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  shelfName: {
    color: 'black',
    margin: 30,
    marginTop: 50,
    textAlign: 'center'
  },

});


class BookShelf extends Component {

  render () {
    const { books, bookShelfName, updateBook, classes} = this.props
    return (
      <div>
        <Typography 
        className= {classes.shelfName} 
        component = "h2"
        variant="display1">
        {bookShelfName}
        </Typography>
        <Grid 
        container
        justify= 'center'
        spacing={40}
        >
            {books.map((book) => (
              <Grid item
              key = {book.id}>
              <Book
                book = {book}
                updateBook = {updateBook}
                className={classes.book}
              />
              </Grid>
            ))}
        </Grid>
      </div>
    )
  }
}

BookShelf.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookShelf);