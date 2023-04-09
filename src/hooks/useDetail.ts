import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { writeData, getDetail, deleteData, updateData } from '../api/firebase';

interface AddDetailProps{
    currentTimeStamp:number;
    content:string;
}

interface DeleteDetailProps{
    id:number;
}

interface UpdateDetailProps{
    id:number;
    content:string;
}

export default function useDetail(id?:string) {
    const queryClient = useQueryClient();

    const detailQuery = useQuery(['detail', id && id], ()=>getDetail(id), {
        staleTime: 1000 * 60 * 60,
        enabled:id ? true : false,
    });


    const addDetail = useMutation(
        ({currentTimeStamp, content} : AddDetailProps)=>writeData(`/details/${currentTimeStamp}`, content),
    );

    const deleteDetail= useMutation(
        ({id} : DeleteDetailProps)=>deleteData(`/details/${id}`),
    );

    const updateDetail= useMutation(
        ({id, content} : UpdateDetailProps)=>updateData(`/details/${id}`,content),
        {
            onSuccess: () => queryClient.invalidateQueries(['detail']),
        }
    );

    return { addDetail, detailQuery, deleteDetail, updateDetail };
}
