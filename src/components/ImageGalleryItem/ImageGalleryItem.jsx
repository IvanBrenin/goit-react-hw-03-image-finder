import css from './ImageGalleryItem.module.css'

export default function ImageGalleryItem({ webformatURL, largeImageURL, onClick }) {

        return (
            <li className={css.ImageGalleryItem}>
                <img onClick={onClick} src={webformatURL} alt="" className={css.ImageGalleryItemImage} data-large={largeImageURL} />
            </li>
        );
    }
