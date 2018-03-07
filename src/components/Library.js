import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import { withStyles } from 'material-ui/styles'
import { Icon } from 'material-ui'

const styles = {
  library: {
    marginTop: 100
  }
}

class Library extends Component {
  
  getBookFromShelf(books, bookshelf) {
        return books.filter((book) => book.shelf === bookshelf);
    }

  render() {
    const { books, updateBook, classes } = this.props

    
    return(
      <div className= {classes.library}>
        <BookShelf
          books ={this.getBookFromShelf (books, "currentlyReading")}
          updateBook = {updateBook}
          bookShelfName = "Currently Reading"
        />
        <BookShelf
          books ={this.getBookFromShelf (books, "wantToRead")}
          updateBook = {updateBook}
          bookShelfName = "Want To Read"
        />
        <BookShelf
          books ={this.getBookFromShelf (books, "read")}
          updateBook = {updateBook}
          bookShelfName = "Read"
        />

      </div>
      )
   }
}

Library.propTypes = {
  updateBook: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Library);