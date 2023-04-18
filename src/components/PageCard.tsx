import { Link } from 'react-router-dom'

type PageProps = {
    to:string;
    title:string;
}

export default function PageCard({to, title}:PageProps) {
  return (
    <Link className="
        border-b-2 border-red-900 border-hidden hover:border-solid
        transiton-all
        hover:scale-105
        hover:text-red-400
        cursor-pointer
        duration-300" to={to}>
            {title}
    </Link>
  )
}
