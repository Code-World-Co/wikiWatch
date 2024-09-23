//import style
import "../style/Home.css";
//import icons
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import video from "../assets/video/trailer.mp4";
import { AiFillGithub } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useGetMostPopularMedia, useSearchData, useGetDataMedia } from "../hooks/useGetDataMedia";
import { SectionArticule, SectionMedia } from "./sectionMedia";

export function Home() {

  const [searchText, setSearchText] = useState('');
  const searchResults = useSearchData({ text: searchText, category: 'multi' });
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

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
          <SectionArticule media={useGetMostPopularMedia({ type: 'movie', language: 'en-US' })} />
          <SearchForm handleChange={handleChange} />
          {
            (searchResults.length > 0) ? <SectionMedia media={searchResults} /> : null
          }
          <div>
            <SectionMedia media={useGetDataMedia({ type: 'movie', category: 'popular', language: 'en-US' })} title={'Upcoming'} type={'movie'}/>
            <SectionMedia media={useGetDataMedia({ type: 'tv', category: 'popular', language: 'en-US' })} title={'Popular TV Shows'} type ={'tv'} />
            <SectionMedia media={useGetDataMedia({ type: 'movie', category: 'top_rated', language: 'en-US' })} title={'Top Rated Movies'} type={'movie'} />
            <SectionMedia media={useGetDataMedia({ type: 'tv', category: 'top_rated', language: 'en-US' })} title={'Top Rated TV Shows'} type={'tv'}/>
          </div>
        </section>
      </section>
    </main>
  );
}


export function SearchForm ({handleChange}){
  return( 
    <section className="searchForm">
    <form className="form">
      <input className="textField" type="text" placeholder="Search ..." onChange={handleChange} />
      <CiSearch className="icon" />
    </form>
  </section>    
  )
}



