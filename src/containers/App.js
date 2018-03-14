import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from '../utils/BooksAPI';
import { Route } from 'react-router-dom';
import Library from '../components/Library/Library';
import Home from '../components/Home/Home';
import Search from '../components/Search/Search';
import Footer from '../components/Footer';

class App extends Component {
  state = {
    books: []
  };
  /**
   * When the App Component has rendered it gets the stored books from
   * local storage
   * @return {[array]} It returns an array of books
   */
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }
  /**
   * Updates a book object when the user changes the shelf
   * @param  {object} bookToUpdate takes in a book to be updated
   * @return {object} book returns the updated book and pushes
   * it to the books array
   */
  updateBook(bookToUpdate) {
    const { books } = this.state;
    let haveBook = false;

    let updatedBooks = books.map(book => {
      if (book.id === bookToUpdate.id) {
        haveBook = true;
        return bookToUpdate;
      } else {
        return book;
      }
    });

    if (!haveBook) {
      updatedBooks.push(bookToUpdate);
    }

    BooksAPI.update(bookToUpdate, bookToUpdate.shelf).then(
      this.setState({ books: updatedBooks })
    );
  }

  /**
   * Renders the Application
   * @return {html} returns the html for the App
   */

  render() {
    const { books } = this.state;
    console.log(books);
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <Home />
            </div>
          )}
        />
        <Route
          path="/library"
          render={() => (
            <div>
              <Library books={books} updateBook={this.updateBook.bind(this)} />
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <div>
              <Search
                libraryBooks={books}
                updateBook={this.updateBook.bind(this)}
              />
            </div>
          )}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
