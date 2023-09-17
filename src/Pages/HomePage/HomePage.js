import React from 'react'
import './HomePage.scss';
import Hero from '../../Components/HomePage/Hero/Hero';
import AlbumCard from '../../Components/HomePage/AlbumCard/AlbumCard';
import Grid from '../../Components/HomePage/Grid/Grid';


const HomePage = () => {
    return (
        <div className='home'>
            <Hero />

            {/* <div className='p-5'>
                <AlbumCard />
            </div> */}

            <Grid type="top" name="Top Albums"/>

        </div>
    )
}

export default HomePage