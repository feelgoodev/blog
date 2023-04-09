import { Link, useParams } from "react-router-dom";
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
                    <Link key={'전체'} to={`/postlists`}>
                        <li className="w-30 
                        border border-red-100 
                        text-center mb-3 mx-2 
                        transiton-all
                        hover:scale-105
                        hover:text-red-400
                        cursor-pointer
                        duration-300	
                        rounded-md">전체</li>
                    </Link>
                    {
                        categoryArray && categoryArray.map((item)=>{
                            return(
                                <Link 
                                key={item.content} 
                                to={`/postlists/${item.content}`}
                                >
                                    <li className="w-30 
                                    border border-red-100 
                                    text-center my-3 mx-2 
                                    transiton-all
                                    hover:scale-105
                                    hover:text-red-400
                                    cursor-pointer
                                    duration-300	
                                    rounded-md">{item.content}</li>
                                </Link>
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
