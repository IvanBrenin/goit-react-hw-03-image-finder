import css from './Modal.module.css';
import { Component } from 'react';

export default class Modal extends Component{

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
            }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }


    render() {
        return (
            <div className={css.Overlay} onClick={this.props.onClose}>
                <div className={css.Modal} >
                    <img src={this.props.largeImageURL} alt=""/>
                </div>
            </div>
        );
    }
}
