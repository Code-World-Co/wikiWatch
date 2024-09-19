import "../style/MediaCard.css";
import { Link } from "react-router-dom";
import { CiGrid41 } from "react-icons/ci";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import cinePhoto from "../images/pexels-tima-miroshnichenko-7991378.jpg";
import { useState } from "react";
import { useMediaPagination } from "../hooks/useGetDataMedia";


export function MediaCard({ pinture, voteAverage, title, overview }) {
  const [active, setActive] = useState(false);

  const handleMouseOver = () => {
    setActive(true);
  };

  const handleMouseOut = () => {
    setActive(false);
  };

  return (
    <div className="card" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <span className="label"><CiStar className="icon" />  {voteAverage}</span>
      <img className="pinture" src={
        pinture === undefined
          ? cinePhoto
          : 'https://image.tmdb.org/t/p/original' + pinture} alt="Movie Poster" 
      />
      <div className="name">
        {title}
      </div>
      {title && (
        <div className={active ? 'activeOverview' : 'desactiveOverview'}>
          <h3 className="title">{title}</h3>
          <p className="text">{overview.split('\n')[0].substring(0, 150)}{overview.length > 100 ? '...' : ''}</p>
        </div>
      )}
    </div>
  );
}

export function SectionMedia({ title, media }) {
  if (!media) {
    return null;
  }

  const { slicedMedia } = useMediaPagination(media);

  return (
    <section className="sectionMedia">
      {title && (
        <header className="titleContainer">
          <h2 className="title">{title}</h2>
          <div className="linkContainer">
            <Link className="link" to="/">
              More
            </Link>
          </div>
        </header>
      )}
      <section className="cardsContainer">
        {slicedMedia.map((item) => (
          <MediaCard
            key={item.id}
            pinture={item.poster}
            voteAverage={item.vote_average}
            title={item.title}
            overview={item.overview}
          />
        ))}
      </section>
    </section>
  );
}


export function SectionArticule({ media }) {
  if (!media) {
    return null;
  }

  return (
    <main className="poster">
        <img
          className="pinture"
          src={media.poster ? 'https://image.tmdb.org/t/p/original' + media.poster : cinePhoto}
          alt="Movie Poster"
        />
        <div className="content">
          <h2 className="title">{media.title}</h2>
          <p className="overview">{media.overview}</p>
          <div className="rating">
            <CiStar className="icon" />
            <span className="text">{media.vote_average}</span>
          </div>
        </div>
        
    </main>
  );
}