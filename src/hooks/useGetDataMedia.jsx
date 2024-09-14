import { useState, useEffect } from "react";
import { apiKey } from "../data/api";
import axios from 'axios';

/*
const links = {
    base: 'https://api.themoviedb.org/3/movie/',
    latest: 'https://api.themoviedb.org/3/movie/latest?language=en-US',
    popular: 'https://api.themoviedb.org/3/movie/popular?language=en-US',
    top_rated: 'https://api.themoviedb.org/3/movie/top_rated?language=en-US',
    upcoming: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US',
    now_playing: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US',
  };
  
  */
  //const popularMovies = useGetDataMedia({type:'movie', category:'popular', language:'en-US'})
 // console.log(popularMovies)


export  function useGetDataMedia({ type, category, language}) {
    const url = 'https://api.themoviedb.org/3/';
    const [data, setData] = useState(null);

    useEffect(() => {       
        async function fetchData() {
            const response = await axios.get(
                (category ) ? `${url}${type}/${category}?language=${language}` :  `${url}${type}/11?`
                , {
                params: {
                  api_key: apiKey,
                },
              });
              console.log(response.data)
              const result = response.data.results.map((item) => {
                return {
                  id: item.id,
                  poster: item.poster_path,
                  vote_average: item.vote_average.toFixed(1),
                };
              });
            setData(result);
              
            
        }
        fetchData();
    }, [type]);
    return  data;
}