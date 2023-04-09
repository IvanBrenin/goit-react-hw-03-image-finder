import React, { Component } from 'react';
import SearchBar from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import css from './App.module.css'



class App extends Component {

  state = {
    searchQuery: null,
  };




  handleSearchFormSubmit = (searchQuery) => {
    this.setState({ searchQuery });
  }

  render() {
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.handleSearchFormSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery} />
      </div>
       )

  }
}
  


export default App;
