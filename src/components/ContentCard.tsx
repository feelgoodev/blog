import { Link, useNavigate  } from 'react-router-dom';
import { PostMetaDataType } from '../pages/PostLists'
import FormatDate from '../util/formatDate';

interface Props{
  item:PostMetaDataType;
}

export default function ContentCard({item}:Props) {
  const navigate = useNavigate();

  return (
    <section
    onClick={(e) => {
      e.preventDefault();
      navigate(`/postdetail/${item.id}`, { state: { item:{...item} } });
    }}
    className='border border-red-100 w-[95%] 
    p-10 text-white cursor-pointer
    transiton-all
    hover:scale-105
    hover:text-red-400
    duration-300	
    rounded-xl
    '
    >
      <h1 className='text-center text-2xl'>{item.title}</h1>
      <article className='flex justify-between'>
          <span>
            {item.category}
          </span>
          <span>
            {FormatDate(item.id)}
          </span>
      </article>
    </section>
  )
}