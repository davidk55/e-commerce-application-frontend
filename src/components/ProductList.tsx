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
  const authentication = useAuth();
  const navigate = useNavigate();
  const [productUpdTrigger, setProductUpdTrigger] = useState(0);

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

  function createNewProduct() {
    navigate('/create');
  }

  return (
    <div className='grid max-w-screen-2xl items-center gap-32 rounded border border-[#6F6F6F] p-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {createProducts()}
    <div>
      {authentication.auth.role == Role.admin && (
        <button
          className='mb-8 h-8 w-36 items-start rounded bg-[#8B8DB2] font-bold md:w-40 md:text-sm'
          onClick={() => createNewProduct()}
        >
          Create New Product
        </button>
      )}
    </div>
  );
}

export default ProductList;
