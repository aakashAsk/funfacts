'use client'
import { useEffect, useState } from "react";
import Category from "./category";
import { CategoryProps } from "@/interfaces/category.interface";

interface props {
  categories: CategoryProps[];
  minimumDisplay: number
}

const CategoriesList:React.FC<props> = ({categories, minimumDisplay}) => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  useEffect(() => {
    
  }, [])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Explore Categories</h2>
            <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="rounded bg-indigo-600 text-white px-6 py-3 font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap"
            >
              {showAllCategories ? 'Show Less' : 'Show More'}
            </button>
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6`}>
          {
              categories.map((category:CategoryProps, index:number) => {
                if(index >= minimumDisplay && !showAllCategories) return;
                return <Category key={index} title={category.title} image={category.image} count={category.count ? category.count : 0} description={category.description?category.description:""}/>
              })
          }
        </div>
      </div>
    </section>
      
  )
}

export default CategoriesList;