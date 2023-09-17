import React, { useEffect, useState } from 'react'
import './Grid.scss';
import axios from 'axios';
import { BASE_URL } from '../../../utils/url';
import AlbumCard from '../AlbumCard/AlbumCard';

const Grid = ({ type, name }) => {


  const [songs, setSongs] = useState([]);

  useEffect(() => {

    let url;

    if (type === 'top') {
      url = `${BASE_URL}/albums/top`
    } else if (type === 'new') {
      url = `${BASE_URL}/albums/new`
    }


    axios.get(url,
      {
        Content: 'application/json',
      })
      .then((response) => {
        console.log(response);
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
          songs?.map((song, index) => {
            return <div className='grid__card'>
              <AlbumCard key={index} title={song?.title} image={song?.image} follows={song?.follows} />
            </div>
          })
        }

      </div>
    </>
  )
}

export default Grid