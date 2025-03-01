import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import './style.css';

interface FactsProps {
    title: string;
    image: string;
    description: string;
    id: string;
    likesCount: number;
}

const Fact:React.FC<FactsProps> = ({title, image, description, id, likesCount}) => {
    const [showShareModal, setShowShareModal] = useState(false);
    const [selectedFactId, setSelectedFactId] = useState < string | null > (null);

    const handleShare = (factId: string) => {
        setSelectedFactId(factId);
        setShowShareModal(true);
    };
    const handleLike = (factId: string) => {
        console.log('Liked fact:', factId);
    };
    return (
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl duration-1000 flex flex-col">
            <img src={image} alt={title} className="w-full h-48 object-cover rounded-lg" />
            <div className="p-6 h-[100%] flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">{title}</h3>
                    <p className="text-gray-600 mb-4">{description}</p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => handleLike(id)}
                            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                           <FontAwesomeIcon icon={faHeart} />
                            <span>{likesCount || 0}</span>
                        </button>
                        <button
                            onClick={() => handleShare(id)}
                            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
                        >
                            <FontAwesomeIcon icon={faUpRightFromSquare} />
                            <span>Share</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Fact 


// like logic {`${fact.isLiked ? 'fas' : 'far'} fa-heart`}