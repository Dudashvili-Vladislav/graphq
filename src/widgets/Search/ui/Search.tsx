import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { searchActions } from "../module/slices/search"
import cls from './Search.module.scss';

const defaultValue = localStorage.getItem("search") || ''

export const Search = () => {
  const [value, setValue] = useState(defaultValue);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(searchActions.setSearch(value));
    }, 500);
    
    return () => {
      clearTimeout(delay);
    };
  }, [value, dispatch]);

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    localStorage.setItem("search", e.currentTarget.value);
  };
  
  return (
    <input 
      value={value} 
      onChange={changeHandler}
      placeholder="Repositories search.." 
      type="text" 
      name="text" 
      className={cls.input} 
    />
  );
};