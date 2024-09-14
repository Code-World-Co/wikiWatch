
import "../style/MediaCard.css";
import { Link } from "react-router-dom";
import { CiGrid41 } from "react-icons/ci";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import cinePhoto from "../images/pexels-tima-miroshnichenko-7991378.jpg";
import { useEffect, useState } from "react";

export function MediaCard({ pinture, voteAverage }) {
  return (
    <div className="card">
      <span className="label"><CiStar className="icon" />  {voteAverage}</span>
      <img className="pinture" src={
        pinture === undefined
          ? cinePhoto
          : 'https://image.tmdb.org/t/p/original' + pinture} alt="Movie Poster" />
    </div>
  )
}

export function SectionMedia({ title, media }) {

  if (!media) {
    return null;
  }


  const [slicedMedia, setSlicedMedia] = useState( media.slice(0, 0));

  useEffect(()=>{
    window.addEventListener('resize', ()=>{
      const screenWidth = window.innerWidth;
      console.log(screenWidth)
      if(screenWidth < 430){
        setSlicedMedia(media.slice(0, 1))
      } else if(screenWidth < 768){
        setSlicedMedia(media.slice(0, 2))
      }
      else if(screenWidth < 1024){
        setSlicedMedia(media.slice(0, 3))
      }
      else if(screenWidth < 1200){
        setSlicedMedia(media.slice(0, 4))
      }

      else if(screenWidth < 1400){
        setSlicedMedia(media.slice(0, 5))
      }

      else{
        setSlicedMedia(media.slice(0, 6))
      }

    })

    return () => {
      window.removeEventListener('resize', ()=>{})
    }
  },[])
  
  return (
    <section className="sectionMedia">
      <header className="titleContainer">
        <h2 className="title">{title}</h2>
        <div className="linkContainer">
          <Link className="link" to="/">
             See more <CiGrid41 className="icon" /> 
          </Link>
        </div>
      </header>
      <section className="cardsContainer">
        {slicedMedia.map((item) => (
          <MediaCard key={item.id} pinture={item.poster} voteAverage={item.vote_average} />
        ))}
        
            <button className="button buttonLeft">
              <MdOutlineKeyboardArrowLeft />
            </button>
            <button className="button buttonRight">
              <MdOutlineKeyboardArrowRight />
            </button>
          
      </section>
    </section>
  )
}
