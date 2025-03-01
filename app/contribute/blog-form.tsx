import { useEffect, useMemo, useRef, useState } from "react";
import JoditEditor from "jodit-react";

const BlogForm = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [blog, setBlog] = useState('<p>Write something...</p>');
    const [selectedImage, setSelectedImage] = useState<string[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const editor = useRef(null);
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file)
            setSelectedImage([URL.createObjectURL(file)]);
        }
    };

    const onChange = () => {

    }
    
    const handleSubmit = (e:any) => {
      e.preventDefault();

      console.log(title, blog, );
    }
    return (
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
                placeholder="Enter an engaging title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-200">
                  <i className="fas fa-cloud-upload-alt text-gray-400 text-2xl mb-2"></i>
                  <span className="text-sm text-gray-500">Upload Image</span>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                  <i className="fas fa-plus text-gray-400 text-2xl"></i>
                </label>
                
                  {selectedImage.map((image, index) => (
                      <div key={index} className="relative w-32 h-32">
                          <img
                              src={image}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                              type="button"
                              onClick={() => {
                                  setSelectedImage(selectedImage.filter((_, i) => i !== index));
                              }}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                              <i className="fas fa-times"></i>
                          </button>
                      </div>
                  ))}
                
              </div>
            </div>
                
            <JoditEditor
              ref={editor}
              config={{
                height: 600, // Set height in pixels
                width: "100%", // Set width (px, %, etc.)
                minHeight: 300, // Optional: Minimum height
                maxHeight: 600,
              }}  
              onChange={(newContent) => {setContent(newContent)}}
              value={blog}
            />

            <button
              type="submit"
              className="!rounded-button w-full bg-blue-600 text-white py-4 px-6 hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 text-lg font-medium"
            >
              <i className="fas fa-paper-plane mr-2"></i>
              Submit
            </button>      
        </form>
    )
}

export default BlogForm