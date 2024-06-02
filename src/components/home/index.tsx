import { FC, useCallback,useEffect, useMemo, useState } from "react";

import GameCard from "@/components/card";
import { UpdateVersion } from "@/components/modal/UpdateApp";
import SearchBar from "@/components/search";
import Spinner from "@/components/spinner";

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

  const handleReloadPage = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
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
    return ['All', ...Array.from(categoriesSet)];
  }, [products]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full min-h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          {isModalOpen && <UpdateVersion onClose={() => setIsModalOpen(false)} />}
          <div className="flex flex-col items-center h-full w-full">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              categories={categories}
            />
            {selectedCategory === 'All' && searchTerm === '' && (
              <>
                <h2 className="text-center mt-10">Popular Products</h2>
                <section className="mt-10">
                  <div className="container mx-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6">
                      {popularProducts.map(product => (
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
                  </div>
                </section>
              </>
            )}
            <h2 className="text-center mt-10">{selectedCategory === 'All' ? 'All Products' : selectedCategory}</h2>
            <section className="mt-10">
              <div className="container mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6">
                  {filteredProducts.map(product => (
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
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};
