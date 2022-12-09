import { useEffect, useState } from 'react';
import ProductListItem from './ProductListItem';
import ProductApiHandler from '../api/ProductApiHandler';

interface Product {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  category: string;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const products: Product[] | string =
        await ProductApiHandler.getProducts();
      if (typeof products != 'string') setProducts(products);
    }

    fetchProducts();
  }, []);

  function createProducts() {
    return products.map((product, idx) => {
      return (
        <ProductListItem
          id={product.id}
          key={idx}
          imageUrl={product.imageUrl}
          name={product.name}
          price={product.price}
          category={product.category}
        />
      );
    });
  }

  return (
    <div className='grid max-w-screen-2xl items-center gap-32 rounded border border-[#6F6F6F] p-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {createProducts()}
    </div>
  );
}

export default ProductList;
