import { useEffect, useState } from 'react'
import useDetail from "../hooks/useDetail";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
import Loading from "../components/Loading";
import {MdOutlineArrowCircleLeft, MdOutlineArrowCircleRight} from "react-icons/md";
import {BsFillPinAngleFill, BsArrowBarDown, BsArrowBarUp} from "react-icons/bs";
import useMetaData from '../hooks/useMetaData';
import { PostMetaDataType } from './PostLists';
import DetailListCard from '../components/DetailListCard';
import FormatDate from '../util/formatDate';
import { WarningAlert } from '../components/Alert';
import { useAuthContext } from '../Context/AuthContext';
import ConfirmAlert from '../components/ConfirmAlert';
import {SuccessAlert} from '../components/Alert';
import useCategory from '../hooks/useCategory';


export default function PostDetail() {

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

  const {
    state: {
      item: { category, title, id},
    },
  } = useLocation();

  const {user} = useAuthContext();

  const [filteredArray, setFilteredArray] = useState<Array<PostMetaDataType>>([]);
  const [currentPostIndex, setCurrentPostIndex] = useState<number|null>(null);
  const [listClicked, setListClicked] = useState<boolean>(false);
  const [lastPageWarning, setLastPageWarning] = useState<boolean>(false);
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);
  const [modifyAlert, setModifyAlert] = useState<boolean>(false);

  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  const navigate = useNavigate();

  useEffect(()=>{
    setCurrentPostIndex(filteredArray.findIndex((element=>element.id === id)));
  },[filteredArray, id])

  const { deleteDetail, detailQuery : {
    isError, isLoading, data:detail
  }} = useDetail(id);

  const { deleteMetaData, updateMetaDataSize, metaDataQuery : {
    isError:metaDataErr, data:metaDataObject, isSuccess, isLoading:metaDataLoading
  }} = useMetaData();

  const {decrementCategory, categoryQuery : {
    data:categoryArray
  }} = useCategory();

  useEffect(()=>{
    isSuccess && setFilteredArray([...metaDataObject[category]]);
  },[isSuccess])

  const modifyPost = ()=>{
    navigate(`/create/${category}/${id}/${currentPostIndex}`);
  }

  const deletePost = ()=>{
    setLoading(true);
    deleteMetaData.mutate(
      {category, currentPostIndex},
      {
        onSuccess: () => {
          deleteDetail.mutate(
            {id},
            {
              onSuccess:()=>{
                const selectedCategory = category;
                if(currentPostIndex !== null && categoryArray){
                  const currentCategoryIndex = categoryArray.findIndex((element)=>element.content === category);
                  const currentCategoryObject = categoryArray[currentCategoryIndex];
                  decrementCategory.mutate(
                    {currentCategoryIndex, selectedCategory, currentCategoryObject},
                    {
                        onSuccess: () => {
                          const selectedCategoryMetaDataArray = metaDataObject[category];
                          updateMetaDataSize.mutate(
                            {selectedCategory, selectedCategoryMetaDataArray, currentPostIndex},
                            {
                              onSuccess:()=>{
                                setSuccess(true);
                                navigate('/postlists');
                                setTimeout(() => {
                                    setSuccess(false);
                                }, 3000);
                              }
                            }
                          )
                        },
                    }
                  )  
                }
              },
              onError: console.error,
            }
          )

        },
        onError: console.error,
        onSettled:()=>setLoading(false)
      }
    )
  }

  const handleDeleteAlert = ()=>setDeleteAlert(!deleteAlert);
  const handleDeleteCallback =(agreedStatus:boolean)=>{
    handleDeleteAlert();
    if(agreedStatus){
      deletePost();
    }
  }; 

  const handleModifyAlert = ()=>setModifyAlert(!modifyAlert);
  const handleModifyCallback =(agreedStatus:boolean)=>{
    handleModifyAlert();
    if(agreedStatus){
      modifyPost();
    }
  }; 

  const handleList = ()=>setListClicked(!listClicked);

  if(isError && metaDataErr){
    return(
      <NotFound/>
    )
  }

  if(isLoading && metaDataLoading){
    return(
      <Loading/>
    )
  }

  return (
    <>
      <section className="flex flex-col justify-center items-center mt-5">
        <section className={`w-full flex ${user ? 'justify-between':'justify-center'} items-start`}>
          {user && <article 
          onClick={handleDeleteAlert}
          className='ml-5 transition-all
          hover:border-solid hover:text-hoverBtn 
          hover:scale-105 border-hidden border-b border-hoverBtn cursor-pointer'> 삭제하기 </article>}
          <h1 className='text-4xl'>{title}</h1>
          {user && <article 
          onClick={handleModifyAlert}
          className='mr-5 transition-all 
          hover:border-solid hover:text-hoverBtn hover:scale-105 
          border-hidden border-b border-hoverBtn cursor-pointer'> 편집하기 </article>}
        </section>
        <article className="flex justify-end w-full text-md px-5">
          <span>
            {FormatDate(id)}
          </span>
        </article>
        <div className='w-[95%] min-h-[112px] grow flex flex-col justify-center items-start px-5 mt-5 bg-detailCardBg opacity-70 rounded-md relative'>
          <BsFillPinAngleFill className='absolute -left-2 -top-5 text-4xl -rotate-90'/>
          <BsFillPinAngleFill className='absolute -right-2 -top-5 text-4xl'/>
          <section className="text-2xl absolute top-5">
            {category}
          </section>
          <section className={
            `flex flex-col grow justify-center ${listClicked ? 'min-h-[100px] my-14' : null}`
            }>
          {
            listClicked && filteredArray.map((item, index)=>{
              return(
                <DetailListCard item={item} index={index} currentPostId={id} key={item.id}/>
              )
            })
          }
          </section>
          <section className='flex w-full justify-between items-center absolute bottom-3 left-0 px-4'>
            <article 
            onClick={handleList}
            className='text-md flex justify-center items-center transition-all hover:scale-105 hover:rotate-6 hover:text-hoverBtn cursor-pointer'>
              <span>목록보기</span> 
              {
                listClicked ? 
                <BsArrowBarUp 
                className='ml-2 text-md'/>
                :
                <BsArrowBarDown 
                className='ml-2 text-md'/>
              }
            </article>
            <article className='flex text-2xl gap-x-2'>
              <MdOutlineArrowCircleLeft 
              onClick={(e) => {
                e.preventDefault();
                if(currentPostIndex !== null){
                  const priorPost = filteredArray[currentPostIndex-1];
                  if(priorPost){
                    navigate(`/postdetail/${priorPost.id}`, { state: { item:{...priorPost} } });

                  }else{
                    setLastPageWarning(true);
                    setTimeout(()=>{
                      setLastPageWarning(false);
                    },3000);
                  }
                }else{
                  console.log('no more');
                }
              }}
              className='hover:text-hoverBtn hover:scale-105 cursor-pointer'/>
              <MdOutlineArrowCircleRight 
              onClick={(e) => {
                e.preventDefault();
                if(currentPostIndex !== null){
                  const nextPost = filteredArray[currentPostIndex+1];
                  if(nextPost){
                    navigate(`/postdetail/${nextPost.id}`, { state: { item:{...nextPost} } });

                  }else{
                    setLastPageWarning(true);
                    setTimeout(()=>{
                      setLastPageWarning(false);
                    },3000);
                  }
                }else{
                  console.log('no more');
                }
              }}
              className='hover:text-hoverBtn hover:scale-105 cursor-pointer'/>
            </article>
          </section>
        </div>
        <pre className="w-full mt-10 px-8 text-xl pb-10" style={{whiteSpace:'pre-wrap', wordWrap:'break-word'}}>
          {detail} 
        </pre> 
      </section>
      {
          lastPageWarning && <WarningAlert text={'다음 페이지가 존재하지 않습니다'}/>
      }
      {
        deleteAlert && <ConfirmAlert 
        handleClose={handleDeleteCallback}
        title={'정말 삭제하시겠습니까?'} 
        description={'삭제하시면 되돌릴수 없습니다. 즉, 영구삭제함을 말합니다'} />
      }
      {
        modifyAlert && <ConfirmAlert 
        handleClose={handleModifyCallback}
        title={'정말 편집하겠습니까?'} 
        description={'제목과 내용을 수정할 수 있습니다'} />
      }
      {
        success && <SuccessAlert text={'포스트 삭제에 성공하였습니다'}/>
      }
    </>
  )
}
