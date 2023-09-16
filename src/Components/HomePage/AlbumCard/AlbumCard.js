import React from 'react'
import './AlbumCard.scss';
import album from '../../../assets/album.png';


const AlbumCard = () => {
    return (
        <div className='album-card'>
            <div className='album-card__cover'>
                <img src={album} alt=""/>
                <div className='album-card__cover__followers'>
                    <div className='followers'>100M Follows</div>
                </div>
            </div>
            <div className='album-card__name'>
                <span>English Songs</span>
            </div>
        </div>
    )
}

export default AlbumCard