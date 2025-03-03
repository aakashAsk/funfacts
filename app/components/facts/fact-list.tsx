"use client"
import React from "react";
import Fact from "./fact";
import { useRouter } from "next/navigation";
import { FactInterace } from '@/interfaces/fact.interface';

interface Props {
    title: string;
    subTitle: string;
    hideTitle: boolean;
    factList: FactInterace[];
}



 const FactsList:React.FC<Props> = ({hideTitle, factList, title}) => {
      const router = useRouter();
      const clickHandle = () => {
        router.push("/facts");
      }
    return (

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {
              hideTitle ? 
              ( <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                  <button className="rounded bg-indigo-600 text-white px-6 py-3 font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap">See All Facts</button>
              </div> ) : null 
            }
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {
              factList.map((fact, i) => {
                  return <Fact title={fact.title} image={fact.image} key={i} description={fact.description} id={fact._id} likesCount={fact.likesCount}/>
              })
            }
            </div>
        </div>
      </section>
        
    )
}

export default FactsList;