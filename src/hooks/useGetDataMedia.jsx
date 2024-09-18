import { useState, useEffect, useRef } from "react";
import { apiKey } from "../data/api";
import axios from 'axios';



export  function useGetDataMedia({ type, category, language}) {
    const [data, setData] = useState(null);
    useEffect(() => {       
        async function fetchData() {
            const url = 'https://api.themoviedb.org/3/';
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

export function useSearchData ({text,category}){
  const [searchResults, setSearchResults] = useState([]);
  useEffect(()=>{
    async function fetchData() {
      const url = 'https://api.themoviedb.org/3/';
      const response = await axios.get(
          `${url}${category}?language=en-US&query=${text}` 
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
      setSearchResults(result); 
  }
  fetchData();
  },[])

  
}


export function useMediaPagination(media) {
  const [leftPosition, setLeftPosition] = useState(0);
  const [rightPosition, setRightPosition] = useState(0);
  const [slicedMedia, setSlicedMedia] = useState([]);
  const [cardsPerPage, setCardsPerPage] = useState(6);

  const updatePositions = () => {
    const screenWidth = window.innerWidth;
    let cards = 6;

    if (screenWidth <= 580) {
      cards = 4;
    
    } else if (screenWidth <= 760) {
      cards = 8;
    } else if (screenWidth <=1120) {
      cards = 12;
    } 
    else  {
      cards= media.length;
    }
    setCardsPerPage(cards);
    setRightPosition(leftPosition + cards);
    setSlicedMedia(media.slice(leftPosition, leftPosition + cards));
  };

  useEffect(() => {
    updatePositions();
    window.addEventListener('resize', updatePositions);

    return () => {
      window.removeEventListener('resize', updatePositions);
    };
  }, [media, leftPosition]);

  const handleLeft = () => {
    if (leftPosition > 0) {
      const newLeftPosition = Math.max(leftPosition - 1, 0);
      const newRightPosition = newLeftPosition + cardsPerPage;
      setLeftPosition(newLeftPosition);
      setRightPosition(newRightPosition);
      setSlicedMedia(media.slice(newLeftPosition, newRightPosition));
    }
  };

  const handleRight = () => {
    if (rightPosition < media.length) {
      const newLeftPosition = leftPosition + 1;
      const newRightPosition = Math.min(rightPosition + 1, media.length);
      setLeftPosition(newLeftPosition);
      setRightPosition(newRightPosition);
      setSlicedMedia(media.slice(newLeftPosition, newRightPosition));
    }
  };

  return { slicedMedia, handleLeft, handleRight };
}