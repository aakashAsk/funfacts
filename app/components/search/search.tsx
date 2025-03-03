'use client'
import React, { useRef, useState } from 'react';
import './style.css';
import {search} from '@/services/search.service';
interface searchSuggestion {
  title: string;
}

export default function Search() {
    const [searchSuggestion, setSearchSuggestion] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    

    const inputHandler = async(e:any) => {
      setSearchQuery(e.target.value);
      let searchResult = await search(e.target.value);
      setSearchSuggestion(searchResult);
      
    }

    const clickHandler = (e:React.MouseEvent<HTMLElement>) => {
      setShowSuggestions(false);
      const text = (e.target as HTMLElement).textContent as string;
      setSearchQuery(text);
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }

    const submitHandler = (e:any) => {
      e.preventDefault();
      console.log("submit", searchQuery);
      // write a programm to navigate to the fact page
    }

    const onFocusHandler = (e: any) => {
      setShowSuggestions(true);
    }

    const onBlurHandler = (e:any) => {
      setShowSuggestions(false);
    }
    return (
        <div className="main-heading flex flex-wrap justify-center mt-10">
          <form onSubmit={submitHandler} action="" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative" >
            <div className="bg-white border-2  shadow p-2 relative rounded flex w-full">
              <span className="w-auto flex justify-end  items-center text-gray-500 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input  value={searchQuery} onFocus={onFocusHandler} onInput={inputHandler} name="episodequery" id="title" className="border-white outline-none border-0 w-full rounded-xl p-2" type="text" placeholder="Find interesting facts..." />
             
              <button ref={buttonRef} type="submit" className="rounded px-4 py-2 font-medium transition-colors whitespace-nowrap bg-customPurple">
                <p className="font-semibold text-xs text-white">Search</p>
              </button>
            </div>
            <div className='w-full relative' onFocus={onFocusHandler} >
              {
                showSuggestions && searchSuggestion && searchSuggestion.length !== 0 && 
                <div className='max-w-7xl mx-auto w-full absolute bg-white rounded-xl shadow-lg shadow-black/20 z-[9999]'>
                  {
                    searchSuggestion.map((suggestion: searchSuggestion, index:number) =>{
                      return <p key={index} 
                      onClick={clickHandler}
                      className='pt-4 px-4 pb-1 text-base border-b  border-[#cfcccc] cursor-pointer transition duration-300 hover:bg-gray-100'>{suggestion.title}</p>
                    })
                  }
                </div>
              }
            </div>
          </form>

          
        </div>
    )
}