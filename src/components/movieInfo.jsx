import { useParams } from "react-router-dom";
import { useGetDetailsData, useSimilarData } from "../hooks/useGetDataMedia";
import { SectionArticule, SectionMedia } from "./sectionMedia";



export function Comment({autor,avatar,content,dateReleased}){
  return(
    <div>
      <header>
        <section>
          <div>
            {
              avatar && <img src={avatar} alt="avatar" />
            }
            
          </div>
          <h5>{autor}</h5>
        </section>
      </header>
      <p>
        {content}
      </p>
    </div>
  )
}

export function MovieInfo() {
  const { id } = useParams();
  const {type} = useParams();

  const details = useGetDetailsData({id, type});
  console.log(details);

  return (
    <main>
      <SectionArticule media={details} />
        <section>
          <header>
            <h2>Reviews</h2>
          </header>
          <div>
        
          </div>
        </section>
      <SectionMedia media={useSimilarData({id, type})} title={'Similar'} type={type}/>

    </main>
  );
}
