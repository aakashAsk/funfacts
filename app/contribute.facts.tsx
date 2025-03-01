// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
// start
import React, { useState, useRef } from 'react';
const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'facts' | 'blog'>('facts');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [editorContent, setEditorContent] = useState('');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [fontSize, setFontSize] = useState('16px');
    const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right' | 'justify'>('left');
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [headingLevel, setHeadingLevel] = useState<1 | 2 | 3 | 4 | 5 | 6 | null>(null);
    const [isBulletList, setIsBulletList] = useState(false);
    const [isNumberList, setIsNumberList] = useState(false);
    const [isBlockquote, setIsBlockquote] = useState(false);
    const [isCodeBlock, setIsCodeBlock] = useState(false);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [linkText, setLinkText] = useState('');
    const [selectedText, setSelectedText] = useState('');
    const [undoStack, setUndoStack] = useState<string[]>([]);
    const [redoStack, setRedoStack] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const categories = [
        'Technology', 'Science', 'Health', 'Environment',
        'Business', 'Politics', 'Education', 'Culture'
    ];
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).map(file => URL.createObjectURL(file));
            setSelectedImages([...selectedImages, ...newImages]);
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        // console.log({ title, description, selectedImages, selectedCategories });
    };
    const handleEditorImageUpload = () => {
        fileInputRef.current?.click();
    };
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
            <div className="max-w-6xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
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
                                            multiple
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                        <i className="fas fa-plus text-gray-400 text-2xl"></i>
                                    </label>
                                    {selectedImages.map((image, index) => (
                                        <div key={index} className="relative w-32 h-32">
                                            <img
                                                src={image}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedImages(selectedImages.filter((_, i) => i !== index));
                                                }}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Categories
                                </label>
                                <div
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>
                                            {selectedCategories.length
                                                ? selectedCategories.join(', ')
                                                : 'Select categories'}
                                        </span>
                                        <i className={`fas fa-chevron-${isDropdownOpen ? 'up' : 'down'}`}></i>
                                    </div>
                                </div>
                                {isDropdownOpen && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                        {categories.map((category) => (
                                            <div
                                                key={category}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                                onClick={() => {
                                                    if (selectedCategories.includes(category)) {
                                                        setSelectedCategories(
                                                            selectedCategories.filter((c) => c !== category)
                                                        );
                                                    } else {
                                                        setSelectedCategories([...selectedCategories, category]);
                                                    }
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes(category)}
                                                    onChange={() => { }}
                                                    className="mr-2"
                                                />
                                                {category}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="!rounded-button w-full bg-blue-600 text-white py-4 px-6 hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 text-lg font-medium"
                            >
                                <i className="fas fa-paper-plane mr-2"></i>
                                Submit
                            </button>
                        </form>
                    )}
                    {/* Blog Tab Content */}
                    {activeTab === 'blog' && (
                        <div className="p-6">
                            <div className="border border-gray-200 rounded-xl shadow-sm">
                                <div className="border-b border-gray-200 p-4 flex flex-wrap gap-4 bg-gray-50/50">
                                    <div className="flex items-center space-x-2 flex-wrap">
                                        {/* Text Formatting */}
                                        <div className="flex border border-gray-200 rounded-lg shadow-sm bg-white mr-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsBold(!isBold)}
                                                className={`px-3 py-1 ${isBold ? 'bg-gray-200' : ''}`}
                                                title="Bold"
                                            >
                                                <i className="fas fa-bold"></i>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsItalic(!isItalic)}
                                                className={`px-3 py-1 border-l border-gray-300 ${isItalic ? 'bg-gray-200' : ''}`}
                                                title="Italic"
                                            >
                                                <i className="fas fa-italic"></i>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsUnderline(!isUnderline)}
                                                className={`px-3 py-1 border-l border-gray-300 ${isUnderline ? 'bg-gray-200' : ''}`}
                                                title="Underline"
                                            >
                                                <i className="fas fa-underline"></i>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsStrikethrough(!isStrikethrough)}
                                                className={`px-3 py-1 border-l border-gray-300 ${isStrikethrough ? 'bg-gray-200' : ''}`}
                                                title="Strikethrough"
                                            >
                                                <i className="fas fa-strikethrough"></i>
                                            </button>
                                        </div>

                                        {/* Headings */}
                                        <div className="flex border border-gray-200 rounded-lg shadow-sm bg-white mr-2">
                                            {[1, 2, 3, 4, 5, 6].map((level) => (
                                                <button
                                                    key={level}
                                                    type="button"
                                                    onClick={() => setHeadingLevel(headingLevel === level ? null : level as 1 | 2 | 3 | 4 | 5 | 6)}
                                                    className={`px-3 py-1 ${level !== 1 ? 'border-l border-gray-300' : ''} ${headingLevel === level ? 'bg-gray-200' : ''
                                                        }`}
                                                    title={`Heading ${level}`}
                                                >
                                                    H{level}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Lists */}
                                        <div className="flex border border-gray-200 rounded-lg shadow-sm bg-white mr-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsBulletList(!isBulletList)}
                                                className={`px-3 py-1 ${isBulletList ? 'bg-gray-200' : ''}`}
                                                title="Bullet List"
                                            >
                                                <i className="fas fa-list-ul"></i>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsNumberList(!isNumberList)}
                                                className={`px-3 py-1 border-l border-gray-300 ${isNumberList ? 'bg-gray-200' : ''}`}
                                                title="Numbered List"
                                            >
                                                <i className="fas fa-list-ol"></i>
                                            </button>
                                        </div>

                                        {/* Quote and Code */}
                                        <div className="flex border border-gray-200 rounded-lg shadow-sm bg-white mr-2">
                                            <button
                                                type="button"
                                                onClick={() => setIsBlockquote(!isBlockquote)}
                                                className={`px-3 py-1 ${isBlockquote ? 'bg-gray-200' : ''}`}
                                                title="Blockquote"
                                            >
                                                <i className="fas fa-quote-right"></i>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsCodeBlock(!isCodeBlock)}
                                                className={`px-3 py-1 border-l border-gray-300 ${isCodeBlock ? 'bg-gray-200' : ''}`}
                                                title="Code Block"
                                            >
                                                <i className="fas fa-code"></i>
                                            </button>
                                        </div>

                                        {/* Undo/Redo */}
                                        <div className="flex border border-gray-200 rounded-lg shadow-sm bg-white mr-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (undoStack.length > 0) {
                                                        const prevContent = undoStack[undoStack.length - 1];
                                                        setRedoStack([...redoStack, editorContent]);
                                                        setEditorContent(prevContent);
                                                        setUndoStack(undoStack.slice(0, -1));
                                                    }
                                                }}
                                                className="px-3 py-1"
                                                disabled={undoStack.length === 0}
                                                title="Undo"
                                            >
                                                <i className="fas fa-undo"></i>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (redoStack.length > 0) {
                                                        const nextContent = redoStack[redoStack.length - 1];
                                                        setUndoStack([...undoStack, editorContent]);
                                                        setEditorContent(nextContent);
                                                        setRedoStack(redoStack.slice(0, -1));
                                                    }
                                                }}
                                                className="px-3 py-1 border-l border-gray-300"
                                                disabled={redoStack.length === 0}
                                                title="Redo"
                                            >
                                                <i className="fas fa-redo"></i>
                                            </button>
                                        </div>

                                        {/* Link */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const selection = window.getSelection();
                                                if (selection) {
                                                    setSelectedText(selection.toString());
                                                }
                                                setShowLinkModal(true);
                                            }}
                                            className="px-3 py-1 border border-gray-300 rounded-lg shadow-sm bg-white mr-2"
                                            title="Insert Link"
                                        >
                                            <i className="fas fa-link"></i>
                                        </button>
                                        <select
                                            value={fontSize}
                                            onChange={(e) => setFontSize(e.target.value)}
                                            className="border border-gray-200 rounded-lg px-3 py-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                                        >
                                            <option value="12px">12px</option>
                                            <option value="14px">14px</option>
                                            <option value="16px">16px</option>
                                            <option value="18px">18px</option>
                                            <option value="20px">20px</option>
                                        </select>
                                        <div className="flex border border-gray-200 rounded-lg shadow-sm bg-white">
                                            <button
                                                type="button"
                                                onClick={() => setTextAlign('left')}
                                                className={`px-3 py-1 ${textAlign === 'left' ? 'bg-gray-200' : ''
                                                    }`}
                                            >
                                                <i className="fas fa-align-left"></i>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setTextAlign('center')}
                                                className={`px-3 py-1 border-l border-r border-gray-300 ${textAlign === 'center' ? 'bg-gray-200' : ''
                                                    }`}
                                            >
                                                <i className="fas fa-align-center"></i>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setTextAlign('right')}
                                                className={`px-3 py-1 ${textAlign === 'right' ? 'bg-gray-200' : ''
                                                    }`}
                                            >
                                                <i className="fas fa-align-right"></i>
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setShowColorPicker(!showColorPicker)}
                                                className="px-3 py-1 border border-gray-300 rounded flex items-center space-x-2"
                                            >
                                                <div
                                                    className="w-4 h-4 rounded"
                                                    style={{ backgroundColor: selectedColor }}
                                                ></div>
                                                <i className="fas fa-chevron-down"></i>
                                            </button>
                                            {showColorPicker && (
                                                <div className="absolute z-10 mt-1 p-2 bg-white border border-gray-300 rounded-md shadow-lg">
                                                    <div className="grid grid-cols-5 gap-2">
                                                        {[
                                                            '#000000',
                                                            '#FF0000',
                                                            '#00FF00',
                                                            '#0000FF',
                                                            '#FFFF00',
                                                            '#FF00FF',
                                                            '#00FFFF',
                                                            '#808080',
                                                            '#800000',
                                                            '#808000',
                                                        ].map((color) => (
                                                            <button
                                                                key={color}
                                                                onClick={() => {
                                                                    setSelectedColor(color);
                                                                    setShowColorPicker(false);
                                                                }}
                                                                className="w-6 h-6 rounded"
                                                                style={{ backgroundColor: color }}
                                                            ></button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleEditorImageUpload}
                                            className="px-3 py-1 border border-gray-300 rounded"
                                        >
                                            <i className="fas fa-image"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="relative">
                                    <textarea
                                        value={editorContent}
                                        onChange={(e) => {
                                            setEditorContent(e.target.value);
                                            setUndoStack([...undoStack, editorContent]);
                                            setRedoStack([]);
                                        }}
                                        style={{
                                            fontSize,
                                            textAlign,
                                            color: selectedColor,
                                            fontWeight: isBold ? 'bold' : 'normal',
                                            fontStyle: isItalic ? 'italic' : 'normal',
                                            textDecoration: `${isUnderline ? 'underline' : ''} ${isStrikethrough ? 'line-through' : ''
                                                }`.trim(),
                                        }}
                                        className={`w-full p-6 min-h-[400px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${isBlockquote ? 'pl-12 border-l-4 border-gray-300' : ''
                                            } ${isCodeBlock ? 'font-mono bg-gray-50' : ''}`}
                                        placeholder="Start writing your amazing blog post..."
                                    />

                                    {/* Link Modal */}
                                    {showLinkModal && (
                                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                            <div className="bg-white rounded-lg p-6 w-96">
                                                <h3 className="text-lg font-medium mb-4">Insert Link</h3>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Link Text
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={linkText || selectedText}
                                                            onChange={(e) => setLinkText(e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            URL
                                                        </label>
                                                        <input
                                                            type="url"
                                                            value={linkUrl}
                                                            onChange={(e) => setLinkUrl(e.target.value)}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                        />
                                                    </div>
                                                    <div className="flex justify-end space-x-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setShowLinkModal(false);
                                                                setLinkUrl('');
                                                                setLinkText('');
                                                            }}
                                                            className="px-4 py-2 border border-gray-300 rounded-lg"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const linkHtml = `<a href="${linkUrl}" target="_blank">${linkText || selectedText
                                                                    }</a>`;
                                                                setEditorContent(
                                                                    editorContent.replace(selectedText, linkHtml)
                                                                );
                                                                setShowLinkModal(false);
                                                                setLinkUrl('');
                                                                setLinkText('');
                                                            }}
                                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                                                        >
                                                            Insert
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default App;
// end
