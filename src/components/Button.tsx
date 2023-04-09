import React from 'react'

interface Props{
    title:string;
    style?:string;
    onClick:any;
}

export default function Button({title, style, onClick}:Props) {
    return (
        <button type='submit' onClick={onClick} className={`py-2 px-5 bg-red-400 rounded-md transition-all hover:scale-105 my-5 ${style}`}>{title}</button>
    )
}