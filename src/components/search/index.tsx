import React from 'react';

interface SearchBarProps {
  categories: string[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  selectedCategory: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ categories, searchTerm, setSearchTerm, setSelectedCategory, selectedCategory }) => {
  return (
    <div className="w-full max-w-4xl p-2 sm:p-4 mb-4 border-2 border-retro-cyan retro-border">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-4 w-full mb-3 sm:mb-4">
        <div className="w-full relative">
          <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-retro-cyan font-retro-alt text-xs sm:text-sm">FIND:</div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="SEARCH GAMES..."
            className="font-retro-text w-full bg-retro-black text-retro-green border-2 border-retro-cyan py-1 sm:py-2 pl-12 sm:pl-16 pr-2 sm:pr-4 text-base sm:text-lg focus:outline-none focus:border-retro-pink focus:shadow-retro-neon"
          />
        </div>
      </div>
      <div className="w-full overflow-x-auto scroll-smooth pb-1">
        <div className="flex justify-start space-x-2 sm:space-x-4 flex-nowrap py-1 sm:py-2 px-1 sm:px-2">
          {categories.map(category => (
            <button
              key={category}
              className={`whitespace-nowrap font-retro text-2xs sm:text-xs tracking-wide px-2 sm:px-4 py-1 sm:py-2 transition-all transform hover:scale-105
                ${category === selectedCategory 
                  ? "bg-retro-cyan text-retro-black border-2 border-white" 
                  : "bg-retro-black text-retro-cyan border-2 border-retro-cyan"}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;