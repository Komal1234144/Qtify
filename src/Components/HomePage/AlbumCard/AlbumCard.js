import React from 'react'
import './AlbumCard.scss';
import Tooltip , { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';


const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      fontSize : '13px'
    },
  });
  


const AlbumCard = ({ title, image, follows, likes , noOfSongs , slug}) => {
    return (
        <CustomWidthTooltip title={noOfSongs ? `${noOfSongs} songs` : ''} arrow 
        placement = "top"
        >
            <div className='album-card'
            onClick={()=>{
                if(follows){
                    window.location.href = `/album/${slug}`
                }
            }}
            >
                <div className='album-card__cover'>
                    <img src={image} alt="" />
                    <div className='album-card__cover__followers'>
                        <div className='followers'>{follows || likes} {follows ? 'Follows' : 'Likes'}</div>
                    </div>
                </div>
                <div className='album-card__name'>
                    <span>{title}</span>
                </div>
            </div>
        </CustomWidthTooltip>
    )
}

export default AlbumCard