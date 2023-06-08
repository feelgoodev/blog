import { Link } from "react-router-dom";
import { LogIn, LogOut } from "../api/firebase";
import { useAuthContext } from "../Context/AuthContext";
import PageCard from "./PageCard";
export default function Header() {

    const {user} = useAuthContext();
    
    return (
    <header className="h-44 bg-stone-900 relative">
        <section className="absolute right-0 flex items-center">
            <article className="mr-1">{user?.displayName}</article>
            <button onClick={user ? LogOut : LogIn} className="border py-1 px-5 rounded-md bg-black text-white">{user ? 'Logout' : 'Login'}</button>
        </section>
        <section className="flex justify-center items-center h-28">
            <Link to='/'><h1 className="text-4xl">Eddy's Tech Blog</h1></Link>  
        </section>
        <section className="flex justify-center items-center h-8 gap-x-8 border-b border-red-100">
            <PageCard to="/" title="Introduction"/>
            <PageCard to="postlists" title="List of posts"/>
            {
                user?.admin ?  
                <PageCard to="create" title="Post Create"/> : null
            }
        </section>
    </header>
    )
}
