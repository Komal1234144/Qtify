import React from 'react'
import './HomePage.scss';
import Hero from '../../Components/HomePage/Hero/Hero';
import AlbumCard from '../../Components/HomePage/AlbumCard/AlbumCard';


const HomePage = () => {
    return (
        <div className='home'>
            <Hero />

            <div className='p-5'>
                <AlbumCard />
            </div>

        </div>
    )
}

export default HomePage