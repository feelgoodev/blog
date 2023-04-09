import {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { LogIn, LogOut, ObserveAuthChange } from "../api/firebase";
import {User} from "firebase/auth";
import { useAuthContext } from "../Context/AuthContext";
export default function Header() {

    const {user} = useAuthContext();
    
    return (
    <header className="h-44 bg-stone-900 relative">
        <section className="absolute right-0 flex items-center">
            <article className="mr-1">{user?.displayName}</article>
            <button onClick={user ? LogOut : LogIn} className="border py-1 px-5 rounded-md bg-black text-white">{user ? '로그아웃' : '로그인'}</button>
        </section>
        <section className="flex justify-center items-center h-28">
            <Link to='/'><h1 className="text-4xl">Eddy's Tech Blog</h1></Link>  
        </section>
        <section className="flex justify-center items-center h-8 gap-x-8 border-b border-red-100">
            <Link className="
            border-b-2 border-red-900 border-hidden hover:border-solid
            transiton-all
            hover:scale-105
            hover:text-red-400
            cursor-pointer
            duration-300" to='/'>소개글1</Link>
            <Link className="
            border-b-2 border-red-900 border-hidden hover:border-solid
            transiton-all
            hover:scale-105
            hover:text-red-400
            cursor-pointer
            duration-300" to='postlists'>글 목록</Link>
            {
                user?.admin ?  
                <Link className="
                border-b-2 border-red-900 border-hidden hover:border-solid
                transiton-all
                hover:scale-105
                hover:text-red-400
                cursor-pointer
                duration-300" to='create'>글 생성</Link> : null
            }
        </section>
    </header>
    )
}
