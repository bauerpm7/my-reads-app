import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import { withStyles } from 'material-ui/styles'
import { Icon } from 'material-ui'
import { Link } from 'react-router-dom'

const styles = {
  library: {
    marginTop: 120,
    paddingBottom:120
  },
  addBooks: {
    position: 'fixed',
    bottom: 40,
    right: 40,
    fontSize: 60
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
        <Link 
        to = "/search">
          <Icon className={classes.addBooks}
          color='primary'
          >add_circle</Icon>
        </Link>
      </div>
      )
   }
}

Library.propTypes = {
  updateBook: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Library);