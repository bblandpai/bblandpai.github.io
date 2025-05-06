import { FC, useCallback, useEffect, useMemo, useState } from "react";

import GameCard from "@/components/card";
import { UpdateVersion } from "@/components/modal/UpdateApp";
import SearchBar from "@/components/search";
import Spinner from "@/components/spinner";
import Pagination from "@/components/Pagination";

import { useError } from "@/context/ErrorContext";

import { Product } from "@/types/product";

interface HomeProps {
  isShowUpdate: boolean;
}

export const Home: FC<HomeProps> = ({ isShowUpdate }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProduct, setHoveredProduct] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { showError } = useError();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isShowUpdate);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30; // Increased from 10 to 30 games per page

  const handleReloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('/products.json');
        if (!response.ok) {
          throw new Error('Network error');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
        showError('Error loading products. Please try again.', handleReloadPage);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [showError, handleReloadPage]);

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || product.categories.includes(selectedCategory))
    );
  }, [products, searchTerm, selectedCategory]);

  // Get current page items
  const currentProducts = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(filteredProducts.length / itemsPerPage);
  }, [filteredProducts.length, itemsPerPage]);

  // Change page
  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Scroll to top after page change
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const popularProducts = useMemo(() => {
    return products.filter(product => product.isPopular);
  }, [products]);

  const categories = useMemo(() => {
    const categoriesSet = new Set<string>();
    products.forEach(product => {
      product.categories.forEach(category => {
        categoriesSet.add(category);
      });
    });
    
    // Lấy danh sách categories và sắp xếp lại
    let categoriesList = ['All', ...Array.from(categoriesSet)];
    
    // Đưa "Spider-Man ROMs" lên trước các danh mục khác
    const spiderManIndex = categoriesList.indexOf("Spider-Man ROMs");
    const gbaRomsIndex = categoriesList.indexOf("Gameboy Advance ROMs");
    const gbaEmulatorsIndex = categoriesList.indexOf("Gameboy Advance Emulators");
    
    // Tạo mảng mới với thứ tự đã thay đổi
    if (spiderManIndex > 0) {
      // Xóa "Spider-Man ROMs" khỏi vị trí hiện tại
      categoriesList = categoriesList.filter(cat => cat !== "Spider-Man ROMs");
      
      // Chèn "Spider-Man ROMs" vào đầu danh sách (sau "All")
      categoriesList.splice(1, 0, "Spider-Man ROMs");
    }
    
    return categoriesList;
  }, [products]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh] w-full">
          <div className="retro-border p-8 bg-retro-black">
            <div className="flex flex-col items-center">
              <Spinner />
              <p className="font-retro-text text-retro-cyan mt-4 text-lg">LOADING GAMES...</p>
              <div className="w-12 h-1 bg-retro-pink mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {isModalOpen && <UpdateVersion onClose={() => setIsModalOpen(false)} />}
          <div className="flex flex-col items-center h-full w-full max-w-6xl mx-auto px-2 sm:px-4">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              categories={categories}
            />
            
            <div className="w-full">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 md:w-4 md:h-4 bg-retro-pink mr-2"></div>
                <h2 className="font-retro text-retro-yellow text-xs sm:text-sm md:text-xl truncate">
                  {selectedCategory === 'All' ? 'ALL GAMES' : selectedCategory.toUpperCase()}
                </h2>
                <div className="flex-1 h-px bg-retro-cyan ml-4"></div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end mb-4 gap-2">
                {/* Removing the "PAGE X OF Y" text as requested */}
              </div>
              
              <section className="mb-6">
                <div className="w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                    {currentProducts.map(product => (
                      <GameCard
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        name={product.name}
                        downloaded={product.downloaded}
                        downloadLink={product.downloadLink}
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(undefined)}
                      />
                    ))}
                  </div>
                  
                  {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                      <p className="font-retro text-retro-pink text-md">NO GAMES FOUND</p>
                      <p className="font-retro-text text-white mt-2">PLEASE TRY ANOTHER SEARCH TERM</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
