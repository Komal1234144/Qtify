import React from 'react'
import './AlbumCard.scss';


const AlbumCard = ({title , image , follows , likes}) => {
    return (
        <div className='album-card'>
            <div className='album-card__cover'>
                <img src={image} alt=""/>
                <div className='album-card__cover__followers'>
                    <div className='followers'>{follows || likes} {follows ? 'Follows' : 'Likes'}</div>
                </div>
            </div>
            <div className='album-card__name'>
                <span>{title}</span>
            </div>
        </div>
    )
}

export default AlbumCard