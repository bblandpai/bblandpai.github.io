import React from 'react';

interface SearchBarProps {
  categories: string[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  selectedCategory: string; // Add selectedCategory to props
}

const SearchBar: React.FC<SearchBarProps> = ({ categories, searchTerm, setSearchTerm, setSelectedCategory, selectedCategory }) => {
  return (
    <div className="bg-gray-900 p-4 w-full">
      <div className="flex justify-center mb-4 w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="px-4 py-2 rounded-lg border border-gray-300 w-full sm:w-2/3 lg:w-1/2"
        />
      </div>
      <div className="w-full overflow-x-auto">
        <div className="flex justify-start space-x-4 text-white flex-nowrap py-2 px-4">
          {categories.map(category => (
            <span
              key={category}
              className={`cursor-pointer hover:text-gray-300 whitespace-nowrap ${category === selectedCategory ? "text-gray-500" : ""}`} // Highlight selected category
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;