import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCategories, updateData, writeData } from '../api/firebase';
import { CategoryType } from '../pages/CreatePost';

interface AddCategoryProp{
    query:string;
    categoryObject:CategoryType;
}

interface UpdateProp{
    currentCategoryIndex:number;
    selectedCategory:string|null;
    currentCategoryObject:CategoryType;
}

export default function useCategory() {
    const queryClient = useQueryClient();

    const categoryQuery = useQuery(['categories'], getCategories, {
    staleTime: 1000 * 60 * 60,
    });

    const addCategory = useMutation(
        ({ query, categoryObject }:AddCategoryProp) => writeData(query, categoryObject),
        {
            onSuccess: () => queryClient.invalidateQueries(['categories']),
        }
    );

    const incrementCategory = useMutation(
        ({currentCategoryIndex, selectedCategory, currentCategoryObject}:UpdateProp) => updateData(`/categories/${currentCategoryIndex}`,{content:selectedCategory, quantity:currentCategoryObject ? (Number(currentCategoryObject.quantity)+1).toString() : 0}),
        {
            onSuccess: () => queryClient.invalidateQueries(['categories']),
        }
    );

    const decrementCategory = useMutation(
        ({currentCategoryIndex, selectedCategory, currentCategoryObject}:UpdateProp) => updateData(`/categories/${currentCategoryIndex}`,{content:selectedCategory, quantity:currentCategoryObject ? (Number(currentCategoryObject.quantity)-1).toString() : 0}),
        {
            onSuccess: () => queryClient.invalidateQueries(['categories']),
        }
    );

    return { categoryQuery, addCategory, incrementCategory, decrementCategory };
}
