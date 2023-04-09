import { useNavigate } from 'react-router-dom';
import { PostMetaDataType } from '../pages/PostLists'

interface Props{
    item:PostMetaDataType;
    index:number;
    currentPostId:number;
}


export default function DetailListCard({item, index, currentPostId}:Props) {
    const navigate = useNavigate();

    return (
    <section 
    onClick={(e) => {
        e.preventDefault();
        navigate(`/postdetail/${item.id}`, { state: { item:{...item} } });
    }}
    className={`flex w-fit justify-start transition-all 
    hover:text-hoverBtn hover:scale-105 cursor-pointer ${currentPostId === item.id ? 'text-hoverBtn' : null}`}>
        <article className='w-5'>
            {index + 1}
        </article>
        <article>
            [ {item.category} ] {item.title}
        </article>
    </section>
    )
}
