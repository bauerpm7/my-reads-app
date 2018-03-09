
import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest';
import { searchTerms } from '../SearchTerms';
import { search } from '../utils/BooksAPI';
import { Debounce } from 'react-throttle';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

// Imagine you have a list of languages that you'd like to autosuggest.


// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : searchTerms.filter(term =>
    term.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);

class SearchBar extends Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      searchResults: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  onSearch = (query: string) => {
    if(searchTerms.includes(query)) {
      search(query, 8).then(searchResults => {
        this.setState(
        { searchResults }
      )
      })
    }
  }
  render() {
    const { value, searchResults, suggestions } = this.state;
    const { updateBook } = this.props
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };
    console.log(searchResults)

    // Finally, render it!
    return (
      <div>
        <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={this.onSearch(value)
        }/>
        <BookShelf
          books ={searchResults}
          updateBook = {updateBook}
          bookShelfName = "Search Results"
        />
      </div>
    );
  }
}
SearchBar.propTypes= {
  updateBook: PropTypes.func
}

export default SearchBar