import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'




class Library extends Component {
  
  getBookFromShelf(books, bookshelf) {
        return books.filter((book) => book.shelf === bookshelf);
    }

  render() {
    const { books, updateBook } = this.props

    
    return(
      <div className= 'library' >
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
  updateBook: PropTypes.func.isRequired
};

export default Library;