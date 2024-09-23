import "../style/MediaCard.css";
import { Link } from "react-router-dom";
import { CiMedal, CiRead, CiStar } from "react-icons/ci";
import cinePhoto from "../images/pexels-tima-miroshnichenko-7991378.jpg";
import { useState } from "react";
import { useMediaPagination, useSimilarData } from "../hooks/useGetDataMedia";


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
      <span className="label"><CiStar className="icon" />  {voteAverage? voteAverage: 0}</span>
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
          {(overview && <p className="text">{overview.split('\n')[0].substring(0, 150)}{overview.length > 100 ? '...' : ''}</p>)}
        </div>
      )}
    </div>
  );
}

export function SectionMedia({  media,title,type}) {
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
          <Link className="card"  to={`/media/${item.id}/${(item.mediaType)? item.mediaType:type}`} key={item.id}>
          <MediaCard
            key={item.id}
            pinture={item.poster}
            voteAverage={item.vote_average}
            title={item.title}
            overview={item.overview}
          />
          </Link>
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
    <main className="infoCard">
        {
          media.background&& 
          <div className="background">
            <img className="pinture" src={'https://image.tmdb.org/t/p/original' + media.background} alt="Movie Poster" />
          </div> 
        }

        <div className="poster">
          <img className="pinture" src={'https://image.tmdb.org/t/p/original' + media.poster} alt="Movie Poster" />
        </div>
        <section className="info">
          <h2>{media.title}</h2>
          <p>
            {media.overview}
          </p>
          {
            media.genres &&
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px'
            }}>
              <p style={{ fontWeight: 600 }}>Genres</p>
              <div className="genres">
              {media.genres.map((genre) => (
                <span className="genre" key={genre.id}>{genre.name}</span>
              ))}
            </div>
            </div> 
          }
          <div className="rating">
            <div className="rate">
              <CiStar className="icon" />
              <div>
              Views
              </div>
               {media.vote_average}
            </div>

            <div className="rate">
              <CiMedal className="icon" />
              <div>
              Vote Average
              </div>
              {media.vote_average}
            </div>

            <div className="rate">
              <CiMedal className="icon" />
              <div>
              Vote Count
              </div>
              {media.voteAcount }
            </div>

          </div>
        </section>        
    </main>
  );
}
