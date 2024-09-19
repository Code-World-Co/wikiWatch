import { SectionMedia } from "./sectionMedia";
import { useGetDataMedia } from "../hooks/useGetDataMedia";
import { Header } from "./Header";
import { useEffect, useState } from "react";

export function Movies() {
    const [searchResults, setSearchResults] = useState([]);
    const handleSearchData = (data) => {
        setSearchResults(data);
    };

    const topRated = useGetDataMedia({type:'movie', category:'top_rated', language:'en-US'});
    const upcoming = useGetDataMedia({type:'movie', category:'upcoming', language:'en-US'});
    const nowPlaying = useGetDataMedia({type:'movie', category:'now_playing', language:'en-US'});

    return (
        <main>
        <Header handleSearchData = {handleSearchData} />
        <section className="movies">
        {searchResults.length > 0 ?
          <SectionMedia key={'search'}  media = {searchResults} /> :     
          <div>
            <SectionMedia key={'top_rated'} title={'Top Rated'} media = {topRated} />
            <SectionMedia key={'upcoming'} title={'Upcoming'} media = {upcoming} />
            <SectionMedia key={'now_playing'} title={'Now Playing'} media = {nowPlaying} />
          </div>
        }
        </section>
        </main>
    );
}

