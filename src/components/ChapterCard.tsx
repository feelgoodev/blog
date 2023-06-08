import React from 'react'
import { Link } from 'react-router-dom'

type ChapterProps = {
    content?:string;
}

export default function ChapterCard({content}:ChapterProps) {
  return (
    <Link 
        key={content ? content : 'all'} 
        to={content ? `/postlists/${content}` : '/postlists'}
        >
            <li className="w-30 
            border border-red-100 
            text-center mb-3 mx-2 
            transiton-all
            hover:scale-105
            hover:text-red-400
            cursor-pointer
            duration-300	
            rounded-md">{content ? content : 'All'}</li>
    </Link>
  )
}
