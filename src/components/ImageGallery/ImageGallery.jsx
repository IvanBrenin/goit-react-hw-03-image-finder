import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import css from './ImageGallery.module.css'


const API_KEY = '35229674-3e393ba1385e05f4c0aa7cd98'

export default class ImageGallery extends Component {

    state = {
        images: null,
        error: null,
        status: 'idle',
        page: 1,
        modal: false,
    }

    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.searchQuery !== this.props.searchQuery) {
            this.setState({ status: 'pending' });
            fetch(`https://pixabay.com/api/?q=${this.props.searchQuery}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
                .then(response =>
                    response.json()
                )
                .then(data => {
                    if (data.hits.length === 0) { return Promise.reject(new Error(`Нет картинок по запросу ${this.props.searchQuery}`)) } else {
                        this.setState({ images: data.hits, status: 'resolved' })
                    }
                }).catch(error => this.setState({ error, status: 'rejected' }))
        }
    }

    handleLoadMore = () => {
        this.setState({ status: 'pending' });
        fetch(`https://pixabay.com/api/?q=${this.props.searchQuery}&page=${this.state.page + 1}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
            .then(response =>
                response.json()
            )
            .then(data => {
                this.setState(prevState => ({
                    images: [...prevState.images, ...data.hits],
                    page: prevState.page + 1,
                    status: 'resolved',
                }))
            })
            .catch(error => this.setState({ error, status: 'rejected' }))
    }

    handleImageClick = (e) => {
        
        if (e.target.nodeName !== 'IMG') {
            return;
        }
        this.setState({ largeImageURL: e.target.dataset.large });
        this.setState({ modal: true });

    }


        onModalClose = () => {
            this.setState({ modal: false });
        }




        render() {
            const { images, error, status, modal, largeImageURL } = this.state;
        
            if (status === 'idle') {
                return <div className={css.ImageGallery}>
                    <p>Enter your request</p>
                </div>
            }

            if (status === 'pending') {
                return <Loader />
            }

            if (status === 'rejected') {
                return <h1>{error.message}</h1>
            }

            if (status === 'resolved') {
                return (
                    <div>
                        <ul className={css.ImageGallery}>
                            {images.map((image) => (
                                <ImageGalleryItem
                                    key={image.id}
                                    webformatURL={image.previewURL}
                                    largeImageURL={image.largeImageURL}
                                    onClick={this.handleImageClick}
                                />
                            ))}
                        </ul>
                        <Button onClick={this.handleLoadMore} />
                        {modal && <Modal onClose={this.onModalClose} largeImageURL={largeImageURL} />}
                    </div>

                );
            }
        }
    }
