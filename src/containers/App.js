import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from '../utils/BooksAPI';
import { Route } from 'react-router-dom'
import Library from "../components/Library"
import LibraryHeader from "../components/LibraryHeader"
import Home from "../components/Home"
import HomeHeader from "../components/HomeHeader"
import SearchHeader from "../components/SearchHeader"
import SearchBar from "../components/SearchBar"

class App extends Component {
  state = {
    books:[], 
    searchResults: [],
  }


  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }


  updateBook(bookToUpdate) {
    const { books } = this.state;
    let haveBook = false;

    let updatedBooks = books.map((book) => {
      if (book.id === bookToUpdate.id) {
        haveBook = true;
        return bookToUpdate;
      } else {
        return book;
      }
    });

    if(!haveBook){
      updatedBooks.push(bookToUpdate);
    }

    BooksAPI.update(bookToUpdate, bookToUpdate.shelf).then(
      this.setState({ books: updatedBooks })
    );
  }

  render() {
    console.log(this.state.books)
    return (
      <div className="App">
        <Route exact path='/' render={() => (
          <div>
            <HomeHeader/>
            <Home/>
          </div>
        )}/>
        <Route path='/library' render={() => (
          <div>
            <LibraryHeader/>
            <Library books = {this.state.books}
              updateBook={this.updateBook.bind(this)}/>
          </div>
        )} />
        <Route path='/search' render={() =>(
          <div>
            <SearchHeader/>
            <SearchBar
            updateBook={this.updateBook.bind(this)}
            />
          </div>
          )}/>
      </div>
    );
  }
}

export default App;
