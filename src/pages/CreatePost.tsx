import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorAlert, SuccessAlert, WarningAlert } from "../components/Alert";
import BasicSelect from "../components/BasicSelect";
import Button from "../components/Button";
import Loading from "../components/Loading";
import useCategory from "../hooks/useCategory";
import useDetail from "../hooks/useDetail";
import useMetaData from "../hooks/useMetaData";
import NotFound from "./NotFound";
import {PostMetaDataType} from "./PostLists"

interface PostType {
    title:string;
    content:string;
}

export interface CategoryType{
    content:string;
    quantity:string;
}

export default function CreatePost() {

    const {category, id, index} = useParams();

    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState<string|null>(null);
    const [post, setPost] = useState<PostType>({title:'',content:''});
    const [success, setSuccess] = useState<boolean>(false);
    const [failText, setFailText] = useState<string|null>(null);
    const [loading, setLoading] = useState(false);
    

    const {addDetail, updateDetail, detailQuery : {
        data:detail, isSuccess:detailSuccess
    }} = useDetail(id && id);
    
    const {addMetaData, updateMetaDataDetail, metaDataQuery : {
        data:metaDataObject,
    }} = useMetaData();
    
    const {incrementCategory, categoryQuery : {
        isError, isLoading, data:categoryArray
    }} = useCategory();

    useEffect(()=>{
        if(id && category && detail && index){
            handleCategory(category);
            setPost({title:metaDataObject[category][index].title, content:detail});
        }else{
            setSelectedCategory(null);
        }
    },[detailSuccess])

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(selectedCategory === 'none' || selectedCategory === null || post.title.length === 0 || post.content.length === 0){
            setFailText("Type category or content")
            setTimeout(()=>{
                setFailText(null);
            },3000);
        }else{
            setLoading(true);
            const currentTimeStamp = new Date().getTime() + 32400000;
            const currentCategoryObject = categoryArray?.find((element)=>element.content === selectedCategory);
            const currentCategoryIndex = categoryArray?.findIndex((element)=>element.content === selectedCategory);
    
            const title = post.title;
            const content = post.content;
            if(currentCategoryIndex !== undefined){
                addDetail.mutate(
                    {currentTimeStamp, content},
                    {
                        onSuccess: () => {
                            currentCategoryObject && addMetaData.mutate(
                                {selectedCategory, currentCategoryObject, currentTimeStamp, title},
                                {
                                    onSuccess: () => {
                                        currentCategoryObject && incrementCategory.mutate(
                                            {currentCategoryIndex, selectedCategory, currentCategoryObject},
                                            {
                                                onSuccess: () => {
                                                setSuccess(true);
                                                setPost({title:'',content:''});
                                                setTimeout(() => {
                                                    setSuccess(false);
                                                }, 3000);
                                                },
                                                onError: ()=>{
                                                    setFailText('increment category erorr');
                                                    setTimeout(()=>{
                                                        setFailText(null);
                                                    },3000);
                                                },
                                            }
                                        )  
                                    },
                                    onError: ()=>{
                                        setFailText('add meta data erorr');
                                        setTimeout(()=>{
                                            setFailText(null);
                                        },3000);
                                    },
                                }
                            )
                        },
                        onError: ()=>{
                            setFailText('add detail erorr');
                            setTimeout(()=>{
                                setFailText(null);
                            },3000);
                        },
                        onSettled:()=>setLoading(false)
                    }
    
                )
            }
            
        }
    }

    const handleSubmitModification = (e:React.FormEvent<HTMLFormElement>, currentPostIndex:number, selectedCategory:string, id:number)=>{
        e.preventDefault();

        if(post.title.length === 0 || post.content.length === 0){
            setFailText("Type title or content")
            setTimeout(()=>{
                setFailText(null);
            },3000);
        }else{
            setLoading(true);
            const currentMetaDataObject:PostMetaDataType = {
                category: selectedCategory,
                title:post.title,
                id: id
            }
            updateMetaDataDetail.mutate(
                {selectedCategory, currentMetaDataObject, currentPostIndex},
                {
                    onSuccess: () => {
                        const content = post.content;
                        updateDetail.mutate(
                            {id,content},
                            {
                                onSuccess: ()=>{
                                    setSuccess(true);
                                    setPost({title:'',content:''});
                                    navigate(`/create`);
                                    setTimeout(() => {
                                        setSuccess(false);
                                    }, 3000);
                                },
                                onError: ()=>{
                                    setFailText('update Detail erorr');
                                    setTimeout(()=>{
                                        setFailText(null);
                                    },3000);
                                },
                            }
                        )
                    },
                    onError: ()=>{
                        setFailText('update MetaData Detail erorr');
                        setTimeout(()=>{
                            setFailText(null);
                        },3000);
                    },
                    onSettled:()=>setLoading(false)
                }
            )  
        }
    }

    const handleCategory = useCallback((value:string) =>setSelectedCategory(value),[]);

    if(isError){
        return(
            <NotFound/>
        )
    }

    if(isLoading){
        return(
            <Loading/>
        )
    }
    
    return (
        <>
        <form className="flex flex-col justify-start items-center mx-30 min-h-[800px]" onSubmit={id&&index&&category ? (e:React.FormEvent<HTMLFormElement>)=>handleSubmitModification(e,Number(index),category,Number(id)) : handleSubmit}>
            <section className="text-center flex-col flex mt-5">
                <label id='title' className="text-2xl">Title</label>
                <input 
                type={'text'} 
                id='title' 
                required 
                className="w-96 h-10 rounded-md pl-2 mt-2 text-black"
                value={post.title}
                onChange={e=>setPost({...post, title:e.target.value})}
                />
            </section>
            {
                categoryArray && categoryArray.length >= 0 && <BasicSelect disabledStatus={id ? true : false} selectArray={categoryArray && categoryArray} handleCategory={handleCategory} fixedCategory={selectedCategory ? selectedCategory : undefined}/>
            }
            <section className="w-full text-center flex flex-col border-t border-red-100 grow mt-10 px-10">
                <label id='content' className="text-2xl mt-5">Content</label>
                <textarea 
                className="flex flex-col w-full text-black grow mt-2 p-5" 
                id='content' 
                value={post.content}
                onChange={e=>setPost({...post, content:e.target.value})}
                required/>
            </section>
            <Button title="Submit" onClick={id&&index&&category ? (e:React.FormEvent<HTMLFormElement>)=>handleSubmitModification(e,Number(index),category,Number(id)) : handleSubmit}/>
        </form>
        {
            success && 
            <SuccessAlert text={'Post has been made successfully'}/>
        }
        {
            failText && 
            <WarningAlert text={failText}/>
        }
        </>
    )
}
