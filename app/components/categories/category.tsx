
import './style.css';

interface CategoryProps {
    title: string;
    description: string;
    image: string;
    count: number;
  }

const Category: React.FC<CategoryProps> = ({title, description, image, count}) => {
    return (
        <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg">
            <img src={image} alt={title} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-200 text-sm">{count} Facts</p>
            </div>
        </div>
    )
}

export default Category;