//import style
import "../style/Home.css";
//import icons
import { useEffect, useState } from "react";
import video from "../assets/video/trailer.mp4";
import { AiFillGithub } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useGetDataMedia, useGetLatestMedia } from "../hooks/useGetDataMedia";
import { SectionArticule, SectionMedia } from "./sectionMedia";

export function Home() {
  const [selectedMediaType, setSelectedMediaType] = useState('movie');
  const [media, setMedia] = useState([]);
  const data = useGetDataMedia({ type: selectedMediaType, category: 'top_rated', language: 'en-US' });
  const topRated = useGetDataMedia({ type: selectedMediaType, category: 'top_rated', language: 'en-US' });
  const upComing = useGetDataMedia({ type: selectedMediaType, category: 'upcoming', language: 'en-US' });

  useEffect(() => {
    setMedia(data)
  }, [selectedMediaType, data]);

  return (
    <main className="home">
      <div className="trailer">
        <video className="video" loop={true} autoPlay={true} onError={() => console.error("error playing video")} src={video}></video>
        <section className="homePage">
          <h1 className="title"><span className="firstWord-title title">WIKI</span> WATCH</h1>
          <h2>You will find the best information of your favorites movies and series!</h2>
          <nav className="navWeb-link">
            <NavLink to="/movies" className='link'>Movies</NavLink>
            <NavLink to="/tv" className='link'>Series</NavLink>
          </nav>
          <div className="nav">
            <a className="link" target="_blank" href="https://github.com/Code-World-Co/WikiWatch">
              <AiFillGithub className="icon" />
            </a>
          </div>
        </section>
      </div>

      <section className="boxCard">
        <section className="boxMedia">
          <SectionArticule media={useGetLatestMedia({ type: selectedMediaType, language: 'en-US' })} />
          <SectionMedia media={upComing} title={'Up coming'} />
          <SectionMedia media={topRated} title={'Top Rated'} />
        </section>
      </section>
    </main>
  );
}


/*

   <SectionArticule media={useGetLatestMedia({type:selectedMediaType ,language:'en-US' })} />
          <SectionMedia media={useGetDataMedia({ type: selectedMediaType, category: 'upcoming', language: 'en-US' })} title={'Popular'} />


 <section className="boxCard">
  <div className="boxText">
          <h2 className={`title-boxText ${selectedMediaType === 'movie' ? 'active' : 'effect'}`} onClick={() => setSelectedMediaType('movie')}>MOVIE</h2>
          <h2 className={`title-boxText ${selectedMediaType !== 'movie' ? 'active' : 'effect'}`} onClick={() => setSelectedMediaType('tv')}>SERIES</h2>
        </div>
        <div className="boxText">
          <h2 className={`title-boxText ${selectedMediaType === 'movie' ? 'active' : 'effect'}`} onClick={() => setSelectedMediaType('movie')}>MOVIE</h2>
          <h2 className={`title-boxText ${selectedMediaType !== 'movie' ? 'active' : 'effect'}`} onClick={() => setSelectedMediaType('tv')}>SERIES</h2>
        </div>
        <motion.div className="boxMedia">
          <SectionMedia media={media} />
        </motion.div>

      </section>

*/