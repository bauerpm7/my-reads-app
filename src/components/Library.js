import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import { withStyles } from 'material-ui/styles'
import { Icon } from 'material-ui'
import { Link } from 'react-router-dom'

const styles = theme => ({
  library: {
    marginTop: 120,
    paddingBottom:120
  },
  addBooks: {
    position: 'fixed',
    bottom: 40,
    right: 40,
    fontSize: 60,
    [theme.breakpoints.down('xs')]: {
      fontSize: 48,
      right:25,
      bottom: 25
    }
  }
})

class Library extends Component {
  
  getBookFromShelf(libraryBooks, bookshelf) {
        return libraryBooks.filter((libraryBook) => libraryBook.shelf === bookshelf);
    }

  render() {
    const { libraryBooks, updateBook, classes } = this.props

    
    return(
      <div className= {classes.library}>
        <BookShelf
          libraryBooks ={this.getBookFromShelf (libraryBooks, "currentlyReading")}
          updateBook = {updateBook}
          bookShelfName = "Currently Reading"
        />
        <BookShelf
          libraryBooks ={this.getBookFromShelf (libraryBooks, "wantToRead")}
          updateBook = {updateBook}
          bookShelfName = "Want To Read"
        />
        <BookShelf
          libraryBooks ={this.getBookFromShelf (libraryBooks, "read")}
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