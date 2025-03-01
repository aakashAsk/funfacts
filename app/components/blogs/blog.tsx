
import './style.css';

interface BlogProps {
    title: string;
    blog: string;
    author: string;
    date: string;
    image: string;
  } 

const Blog:React.FC<BlogProps> = ({image, title, blog, date, author}) => {

    function truncateText(text: string, wordLimit: number): string {
        const words = text.split(' ');
        if (words.length > wordLimit) {
          return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    }

    

    return (
      <div className="bg-white rounded-lg shadow-lg hover:shadow-xl duration-1000">
          <img src={image} alt={title} className="w-full h-64 object-cover" />
          <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
              <div className="flex items-center text-gray-500 text-sm mb-4">
                  <span>{author}</span>
                  <span className="mx-2">•</span>
                  <span>{date}</span>
              </div>
              <p className="text-gray-600 mb-4">{blog}</p>
              <button className="!rounded-button text-indigo-600 font-medium hover:text-indigo-700 transition-colors whitespace-nowrap">Read More →</button>
          </div>
      </div>
    )
}

export default Blog;