import { SectionMedia } from "./sectionMedia";
import { useGetDataMedia } from "../hooks/useGetDataMedia";

export function Movies({ isAdult }) {
    
    return (
        <section className="movies">
            <SectionMedia key={'popular'}  title={'Popular'}  media = {useGetDataMedia({type:'movie', category:'popular', language:'en-US'})} />
            <SectionMedia key={'top_rated'} title={'Top Rated'} media = {useGetDataMedia({type:'movie', category:'top_rated', language:'en-US'})} />

        </section>
    );
}