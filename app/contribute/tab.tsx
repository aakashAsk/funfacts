'use client'
import FactForm from "./fact-form";
import BlogForm from "./blog-form";
import { CategoryProps } from "@/interfaces/category.interface";
import { useState } from "react";

interface props {
    categories: CategoryProps[];
}

  
const Tabs:React.FC<props> =  ({categories}) => {
    const [activeTab, setActiveTab] = useState<'facts' | 'blog'>('facts');
    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
              {/* Tabs */}
              <div className="flex border-b bg-gray-50/50 px-6">
                <button
                  className={`px-8 py-5 text-lg font-medium transition-all duration-200 relative ${activeTab === 'facts'
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                  onClick={() => setActiveTab('facts')}
                >
                  Facts
                  {activeTab === 'facts' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 animate-slide-in"></div>
                  )}
                </button>
                <button
                  className={`px-8 py-5 text-lg font-medium transition-all duration-200 relative ${activeTab === 'blog'
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                  onClick={() => setActiveTab('blog')}
                >
                  Blog
                  {activeTab === 'blog' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 animate-slide-in"></div>
                  )}
                </button>
              </div>
              {/* Facts Tab Content */}
              {activeTab === 'facts' && (
                <FactForm categories={categories}/>
              )}
              {/* Blog Tab Content */}
              {activeTab === 'blog' && (
                <BlogForm />
              )}
            </div>
    )
}

export default Tabs; 