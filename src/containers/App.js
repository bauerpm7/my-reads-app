import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from '../utils/BooksAPI';
import { Route } from 'react-router-dom';
import Library from '../components/Library/Library';
import LibraryHeader from '../components/Library/LibraryHeader';
import Home from '../components/Home/Home';
import SearchHeader from '../components/Search/SearchHeader';
import Search from '../components/Search/Search';
import Footer from '../components/Footer';

class App extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

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
              <LibraryHeader />
              <Library books={books} updateBook={this.updateBook.bind(this)} />
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <div>
              <SearchHeader />
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
