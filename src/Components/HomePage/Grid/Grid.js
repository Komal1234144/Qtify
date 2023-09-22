import React, { useEffect, useState } from 'react'
import './Grid.scss';
import axios from 'axios';
import { BASE_URL } from '../../../utils/url';
import AlbumCard from '../AlbumCard/AlbumCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Grid = ({ type, name }) => {


  const [songs, setSongs] = useState([]);
  const [swiperRef, setSwiperRef] = useState(null);
  const [value, setValue] = React.useState(0);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/genres`,
      {
        Content: 'application/json',
      })
      .then((response) => {
        // console.log(response)
        if(response.status === 200){
          setGenres(response?.data?.data)
        }

      })
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(() => {

    let url;

    if (type === 'top') {
      url = `${BASE_URL}/albums/top`
    } else if (type === 'new') {
      url = `${BASE_URL}/albums/new`
    } else if (type === 'songs') {
      url = `${BASE_URL}/songs`
    }


    axios.get(url,
      {
        Content: 'application/json',
      })
      .then((response) => {
        // console.log(response);
        if (response.status === 200) {
          setSongs(response.data)
        }
      })

  }, [])


  return (
    <>
      <h4>{name}</h4>
      <div className='grid'>

        {
          type === 'songs'
          &&
          <Box sx={{ width: '100%' , marginBottom : '20px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
              textColor='white'
              TabIndicatorProps={{style: {background:'#34c94b'}}}
              value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="All" 
                 sx={{
                  color : 'white',
                  fontSize : '15px',
                  textTransform : 'capitalize'
                }}
                {...a11yProps(0)} />
                {
                  genres?.map((genre, index) => {
                    return <Tab label={genre.label}
                    sx={{
                      color : 'white',
                      fontSize : '15px',
                      textTransform : 'capitalize'
                    }}
                    {...a11yProps(index + 1)} />
                  })
                }
              </Tabs>
            </Box>
          </Box>
        }

        <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={7}
          centeredSlides={false}
          spaceBetween={2}
          pagination={{
            type: 'fraction',
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {
            songs?.map((song, index) => {
              return <SwiperSlide>
                <div className='grid__card'>
                  <AlbumCard key={index} title={song?.title} image={song?.image} follows={song?.follows} likes={song?.likes} noOfSongs={song?.songs?.length} slug={song?.slug}/>
                </div>
              </SwiperSlide>
            })
          }
        </Swiper>

        {/* {
          songs?.map((song, index) => {
            return <div className='grid__card'>
              <AlbumCard key={index} title={song?.title} image={song?.image} follows={song?.follows} likes={song?.likes} />
            </div>
          })
        } */}

      </div>
    </>
  )
}

export default Grid