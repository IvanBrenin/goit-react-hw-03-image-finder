import React, { Component } from 'react';
import {AiOutlineSearch} from 'react-icons/ai'
import css from './SearchBar.module.css'

export default class SearchBar extends Component {
    state = {
        searchQuery: '',
    }

    handleSearchQueryChange = (e) => {
        this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.searchQuery.trim() === '') {
            alert('Enter your request'); 
            return;
        }
        this.props.onSubmit(this.state.searchQuery); 
        this.setState({ searchQuery: '' });
        e.currentTarget.reset();

    }


    render() {
        return (
            <header className={css.Searchbar}>
                <form onSubmit={this.handleSubmit} className={css.SearchForm}>
                    <button type="submit" className={css.SearchFormButton}>
                        <AiOutlineSearch size='30' />
                        <span className={css.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        className={css.SearchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        value={this.state.searchQuery}
                        onChange={this.handleSearchQueryChange}
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        );
    }
}