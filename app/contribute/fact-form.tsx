import { useState } from "react";
import { CategoryProps } from "@/interfaces/category.interface";
import { postFacts } from "@/services/fact.service";


interface props {
    categories: CategoryProps[];
}

const FactForm:React.FC<props> = ({categories}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [categoriesList, setCategoriesList] = useState<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string[]>([]);
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(selectedCategories);
        // Handle form submission
        setIsLoading(true);
        const data = new FormData();
        data.append("title", title);
        data.append("description", description);
        if(image) {
          data.append("image", image);
        }
        data.append("categories", JSON.stringify(selectedCategories));
        data.append("link", link);
        data.append("userId", "123");

        postFacts(data).then((data) => {
          console.log(data);
          // clear data 
          if(data.status === 200) {
            setCategoriesList([]);
            setSelectedCategories([]);
            setDescription("");
            setTitle("")
            setLink("")
            setSelectedImage([])
            setImage(null);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
        
        // axios.post('/apis/facts', data)
        
    };

    const handleFocusOut = (e: any) => {
      setIsDropdownOpen(false);
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file)
            setSelectedImage([URL.createObjectURL(file)]);
        }
    };

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
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
                      placeholder="Write a detailed description..."
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
                  <div className="relative" tabIndex={0}
                      onBlur={handleFocusOut}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categories
                    </label>
                    <div
                      className="w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      
                    >
                      <div className="flex items-center justify-between">
                        <span>
                          {categoriesList.length
                            ? categoriesList.join(', ')
                            : 'Select categories'}
                        </span>
                        <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
                      </div>
                    </div>
                    {isDropdownOpen && (
                      <div className="absolute z-10 w-full h-[200px] overflow-scroll mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                        {categories.map((category:CategoryProps, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            onClick={() => {
                              if (selectedCategories.includes(category._id)) {
                                setSelectedCategories(
                                  selectedCategories.filter((c) => c !== category._id)
                                );
                                setCategoriesList(
                                  categoriesList.filter((c) => c !== category.title)
                                )
                              } else {
                                setSelectedCategories([...selectedCategories, category._id]);
                                setCategoriesList([...categoriesList, category.title]);
                              }
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category._id)}
                              onChange={() => { }}
                              className="mr-2"
                            />
                            {category.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Informative Links
                    </label>
                    <input
                      type="text"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
                      placeholder="Provide any aditional links"
                    />
                  </div>
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

export default FactForm; 


//pattern for links -  https?:\/\/(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?
