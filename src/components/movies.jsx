import { SectionMedia } from "./sectionMedia";
import { useGetDataMedia } from "../hooks/useGetDataMedia";
import { Header } from "./Header";

export function Movies({ isAdult }) {
    
    return (

        <>
        <Header/>
        <section className="movies">
            
            <SectionMedia key={'top_rated'} title={'Top Rated'} media = {useGetDataMedia({type:'movie', category:'top_rated', language:'en-US'})} />
            <SectionMedia key={'upcoming'} title={'Upcoming'} media = {useGetDataMedia({type:'movie', category:'upcoming', language:'en-US'})} />
            <SectionMedia key={'now_playing'} title={'Now Playing'} media = {useGetDataMedia({type:'movie', category:'now_playing', language:'en-US'})} />
        </section>
        </>
    );
}