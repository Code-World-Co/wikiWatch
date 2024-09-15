
import "../style/MediaCard.css";
import { Link } from "react-router-dom";
import { CiGrid41 } from "react-icons/ci";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import cinePhoto from "../images/pexels-tima-miroshnichenko-7991378.jpg";
import { useState } from "react";
import { useMediaPagination } from "../hooks/useGetDataMedia";

/*
  {(title && description)?
        <div className={active?'activeOverview':'desactiveOverview'}>
          <h3 className="title" >{title}</h3>
          <p className="text">{overView}</p>
        </div>: <div></div>
      }

*/

export function MediaCard({ pinture, voteAverage, title,overview,genres}) {
  const [active, setActive] = useState(false);
  const handleMouseOver = ()=>{
    setActive(true)
  }
  const handleMouseOut = ()=>{
    setActive(false)
  }
  return (
    <div className="card" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >
      <span className="label"><CiStar className="icon" />  {voteAverage}</span>
      <img className="pinture" src={
      pinture === undefined
      ? cinePhoto
      : 'https://image.tmdb.org/t/p/original' + pinture} alt="Movie Poster" 
      />
      
      {(title)?
      <div className={active?'activeOverview':'desactiveOverview'}>
      <h3 className="title" >{title}</h3>
      <p className="text">{overview.split('\n')[0].substring(0, 150)}{overview.length > 100 ? '...' : ''}</p>
      <div className="genres"> 
        {
          (genres)? genres.map((genre, index) => {
            return <div key={index} className="genre">{genre.name}</div>
          }): null
        }
      </div>

      </div>
      : null
      
      }

      
    </div>
    )
}

export function SectionMedia({ title, media }) {
  if (!media) {
    return null;
  }

  const { slicedMedia, handleLeft, handleRight } = useMediaPagination(media);

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
          <MediaCard key={item.id} pinture={item.poster} voteAverage={item.vote_average} title={item.title} overview={item.overview} />
        ))}
        <button className="button buttonLeft" onClick={handleLeft}>
          <MdOutlineKeyboardArrowLeft />
        </button>
        <button className="button buttonRight" onClick={handleRight}>
          <MdOutlineKeyboardArrowRight />
        </button>
      </section>
    </section>
  );
}