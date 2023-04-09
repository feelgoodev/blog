import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addMetaData as addMetaDataFirebase, getMetaData, deleteData, updateMetaDataSizeFirebase, updateData } from '../api/firebase';
import { CategoryType } from '../pages/CreatePost';
import { PostMetaDataType } from '../pages/PostLists';

interface AddMetaDataProps{
    selectedCategory:string|null;
    currentCategoryObject:CategoryType;
    currentTimeStamp:number;
    title:string;
}

interface DeleteMetaDataProps{
    category:string|null;
    currentPostIndex:number|null;
}

interface UpdateMetaDataSizeProps{
    selectedCategory:string|null; 
    selectedCategoryMetaDataArray:Array<PostMetaDataType>;
    currentPostIndex:number;
}

interface UpdateMetaDataDetailProps{
    selectedCategory:string|null; 
    currentMetaDataObject:PostMetaDataType;
    currentPostIndex:number;
}

export default function useMetaData() {
    const queryClient = useQueryClient();

    const metaDataQuery = useQuery(['metadata'], getMetaData, {
        staleTime: 1000 * 60 * 60,
    });
    
    const addMetaData = useMutation(
        ({selectedCategory, currentCategoryObject, currentTimeStamp, title} : AddMetaDataProps)=>addMetaDataFirebase(selectedCategory, currentCategoryObject, currentTimeStamp, title),
        {
            onSuccess: () => queryClient.invalidateQueries(['metadata']),
        }
    );

    const deleteMetaData = useMutation(
        ({category, currentPostIndex} : DeleteMetaDataProps)=>deleteData(`/metaData/${category}/${currentPostIndex}`),
        {
            onSuccess: () => queryClient.invalidateQueries(['metadata']),
        }
    );

    const updateMetaDataSize = useMutation(
        ({selectedCategory, selectedCategoryMetaDataArray, currentPostIndex} : UpdateMetaDataSizeProps)=>updateMetaDataSizeFirebase(`/metaData/${selectedCategory}`, selectedCategoryMetaDataArray, currentPostIndex),
        {
            onSuccess: () => queryClient.invalidateQueries(['metadata']),
        }
    );

    const updateMetaDataDetail = useMutation(
        ({selectedCategory, currentMetaDataObject, currentPostIndex} : UpdateMetaDataDetailProps)=>updateData(`/metaData/${selectedCategory}/${currentPostIndex}`, currentMetaDataObject),
        {
            onSuccess: () => queryClient.invalidateQueries(['metadata']),
        }
    );

    return { addMetaData, metaDataQuery, deleteMetaData, updateMetaDataSize, updateMetaDataDetail};
}
