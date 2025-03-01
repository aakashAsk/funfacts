'use client'
import React from "react";
import Blog from "./blog";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  subTitle: string;
}

const BlogsList:React.FC<Props> = ({title, subTitle}) => {
    const blogs = [
          {
            id: 1,
            title: 'The Psychology of Time Perception',
            author: 'Dr. Elizabeth Mitchell',
            date: 'February 12, 2025',
            preview: 'Why does time seem to speed up as we age? A deep dive into the fascinating world of temporal psychology.',
            image: 'https://public.readdy.ai/ai/img_res/4841c40ab17e2634026bfc626f4923dc.jpg'
        },
        {
            id: 2,
            title: 'Quantum Computing Breakthrough',
            author: 'Prof. James Richardson',
            date: 'February 14, 2025',
            preview: 'Scientists achieve quantum supremacy in a groundbreaking experiment that could revolutionize computing.',
            image: 'https://public.readdy.ai/ai/img_res/f3836c937ad42c571ec3d084c164bfd2.jpg'
        }
      ];

      const router = useRouter();
      const clickHandle = () => {
        router.push("/blogs");
      }
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Blogs</h2>
            <button className="rounded bg-indigo-600 text-white px-6 py-3 font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap">See All Blogs</button>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {
                blogs.map((blog, i) =>  {
                  return <Blog key={i} image={blog.image} title={blog.title} blog={blog.preview} author={blog.author} date={blog.date}/>
                })
              }
            </div>
        </div>
      </section>
    )
}

export default BlogsList;

{/* <div className="mt-20 flex items-center flex-col w-[80%] m-auto">
            <h2 className="text-4xl font-medium">{title}</h2>
            <p className="text-lg font-light">{subTitle}</p>
            <div className="flex flex-wrap gap-10 mt-10">
                {
                    blogs.map((blog, i) => {
                        return <Blog key={i} img={blog.img} title={blog.title} blog={blog.blog} author={blog.author} dateTime={blog.dateTime}/>
                    })
                }
            </div>
            <button onClick={clickHandle} className="mt-10 bg-transparent border-2 border-gray-500 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500">Load More</button>
        </div> */}