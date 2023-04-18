import { Link, useParams } from "react-router-dom";
import ChapterCard from "../components/ChapterCard";
import ContentCard from "../components/ContentCard";
import Loading from "../components/Loading";
import useCategory from "../hooks/useCategory";
import useMetaData from "../hooks/useMetaData";
import NotFound from "./NotFound";

export interface PostMetaDataType{
    category:string;
    id:number;
    title:string;
}

export default function PostLists() {

    const {id} = useParams();

    const {metaDataQuery : {
        isError, data:metaDataObject, isSuccess
    }} = useMetaData();

    const {categoryQuery : {
        isError:categoryErr, data:categoryArray, isSuccess:categorySuccess
    }} = useCategory();

    if(isError && categoryErr){
        return(
            <NotFound/>
        )
    }

    if(isSuccess && categorySuccess){
        let tempArr:Array<PostMetaDataType> = []
        if(id && metaDataObject){
            if(metaDataObject[id]){
                tempArr = [...metaDataObject[id]].sort((a,b)=>b.id-a.id);
            }
        }else{
            for (const key in metaDataObject){
                tempArr = [...tempArr, ...metaDataObject[key]].sort((a,b)=>b.id-a.id);
            }
        }
        return (
            <main className="flex">
                <ul className="w-40 mt-10">
                    <ChapterCard/>
                    {
                        categoryArray && categoryArray.map((item)=>{
                            return(
                                <ChapterCard content={item.content}/>
                            )
                        })
                    }
                </ul>
                <section className="flex flex-col justify-start items-center grow mt-10 gap-y-5">
                    {   
                        tempArr.map((item,index)=>{
                            return(
                            <ContentCard key={item.id} item={item}/>
                            )
                        })
                    }
                </section>
            </main>
        );
    }

    return(
        <main className="flex flex-col justify-center items-center pt-20">
            <Loading/>  
        </main>
    )

}
