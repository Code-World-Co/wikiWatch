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
              const result = response.data.results.map((item) => {
                return {
                  id: item.id,
                  poster: item.poster_path,
                  vote_average: item.vote_average.toFixed(1),
                  title: item.title || item.name,
                  overview: item.overview
                };
              });
            setData(result); 
        }
        fetchData();
    }, [type]);
    return  data;
}


export function useMediaPagination(media) {
  const arrayLength = media.length;
  const [leftPosition, setLeftPosition] = useState(0);
  const [rightPosition, setRightPosition] = useState(0);
  const [slicedMedia, setSlicedMedia] = useState([]);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    let rightPos = 0;

    if (screenWidth < 430) {
      rightPos = 1;
    } else if (screenWidth < 768) {
      rightPos = 2;
    } else if (screenWidth < 1024) {
      rightPos = 3;
    } else if (screenWidth < 1200) {
      rightPos = 4;
    } else if (screenWidth < 1400) {
      rightPos = 5;
    } else {
      rightPos = 6;
    }

    setRightPosition(rightPos);
    setSlicedMedia(media.slice(leftPosition, rightPos));

    window.addEventListener('resize', () => {
      const screenWidth = window.innerWidth;
      let newRightPos = 0;

      if (screenWidth < 430) {
        newRightPos = 1;
      } else if (screenWidth < 768) {
        newRightPos = 2;
      } else if (screenWidth < 1024) {
        newRightPos = 3;
      } else if (screenWidth < 1200) {
        newRightPos = 4;
      } else if (screenWidth < 1400) {
        newRightPos = 5;
      } else {
        newRightPos = 6;
      }

      setRightPosition(newRightPos);
      setSlicedMedia(media.slice(leftPosition, newRightPos));
    });
  }, []);

  const handleLeft = () => {
    if (leftPosition > 0) {
      setLeftPosition(leftPosition - 6);
      setRightPosition(rightPosition - 6);
      setSlicedMedia(media.slice(leftPosition - 6, rightPosition - 6));
    }
  };

  const handleRight = () => {
    if (rightPosition < arrayLength) {
      setLeftPosition(leftPosition + 6);
      setRightPosition(rightPosition + 6);
      setSlicedMedia(media.slice(leftPosition + 6, rightPosition + 6));
    }
  };

  return { slicedMedia, handleLeft, handleRight };
}
