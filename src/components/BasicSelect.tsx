import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Loading from './Loading';
import Button from './Button';
import useCategory from '../hooks/useCategory';
import { CategoryType } from '../pages/CreatePost';
import { ErrorAlert, SuccessAlert } from './Alert';

interface Props{
    selectArray: Array<{quantity:string, content: string}>;
    handleCategory:(value:string)=>void;
    disabledStatus:boolean;
    fixedCategory?: string | undefined;
}

export default React.memo(
    function BasicSelect({selectArray, handleCategory, disabledStatus, fixedCategory}:Props) {
        const [selected, setSelected] = React.useState('');
        const [categoryLoading, setCategoryLoading] = React.useState(false);
        const [success, setSuccess] = React.useState<boolean>(false);
        const [fail, setFail] = React.useState<boolean>(false);
        const [newCategory, setNewCategory] = React.useState<string>('');
        
        const handleChange = (event: SelectChangeEvent) => {
        setSelected(event.target.value as string);
        handleCategory(event.target.value as string);
        };
        
        
        const { addCategory } = useCategory();
        
        const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault();
            handleCategory(newCategory);
            // setNewCategory('');
            setCategoryLoading(true);
        
            const query:string = `/categories/${selectArray.length}`;
            const categoryObject:CategoryType = {content:newCategory, quantity:'0'};
        
            addCategory.mutate(
                {query, categoryObject},
                {
                    onSuccess:()=>{
                        setSuccess(true);
                        setCategoryLoading(false)
                        setTimeout(()=>{
                            setSuccess(false);
                        },3000)
                    },
                    onError:()=>console.log('error'),
                }
            )
        }
        
        const handleNewCategorySubmit = (e:React.ChangeEvent<HTMLInputElement>)=>{
            const checkFormat = checkIfGoodFormat(e.target.value);
            if(checkFormat){
                setFail(true);
                setTimeout(()=>{
                    setFail(false);
                },3000)
            }else{
                setNewCategory(e.target.value);
            }
        }
        
        
        if(selectArray.length >= 0){
            return (
                <>
                    <Box sx={{ minWidth: 120 }} className="border-b border-r border-l border-red-100 rounded-md mt-10">
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" style={{color:"white"}}>카테고리</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selected}
                            label={fixedCategory  ? fixedCategory : "카테고리"}
                            onChange={handleChange}
                            style={{color:"white"}}
                            disabled={disabledStatus}
                        >  
                        {
                            selectArray.map((element, index)=>{
                                return(
                                    <MenuItem key={index} value={element.content}>{element.content}</MenuItem>
                                )
                            })
                        }
                        <MenuItem key={'none'} value={'none'}>추가하기</MenuItem>
                        </Select>
                        </FormControl>
                    </Box>
                    {
                        selected === "none" && 
                        <form 
                        onSubmit={handleSubmit}>
                            <input type='text' 
                            className='text-black m-4 p-2 rounded-md' 
                            onChange={handleNewCategorySubmit} 
                            value={newCategory}
                            required/>
                            <Button title='등록하기' onClick={handleSubmit}/>
                        </form>
                    }
                    {
                        success && 
                        <SuccessAlert text={'성공적으로 등록되었습니다'}/>
                    }
                    {
                        fail &&
                        <ErrorAlert text={'".", "#", "$", "[", "]" 는 포함하시면 안됩니다 ^^'}/>
                    }
                    {
                        categoryLoading && 
                        <Loading/>
                    }
                </>
                );
        }
        
        return (
            <Loading/>
        )
        }
)


function checkIfGoodFormat(sentence:string) : boolean {
    const nonFormatArr = [".", "#", "$", "[", "]"];

    for (const element of nonFormatArr){
        if(sentence.includes(element)){
            return true;
        }
    }
    return false;
}