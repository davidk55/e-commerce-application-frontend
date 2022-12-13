import { useEffect, useState } from 'react';
import ProductListItem from './ProductListItem';
import ProductApiHandler from '../api/ProductApiHandler';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  category: string;
}

enum Role {
  user = 'ROLE_USER',
  admin = 'ROLE_ADMIN',
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
  }, [productUpdTrigger]);

  function handleDelete(productId: number) {
    ProductApiHandler.deleteProduct(
      authentication?.auth.accessToken,
      productId
    );
    setTimeout(() => {
      setProductUpdTrigger(
        (prevProudctUpdTrigger) => prevProudctUpdTrigger + 1
      );
    }, 200);
  }

  function handleEdit(productId: number) {
    navigate(`/edit/${productId}`);
  }

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
          handleDelete={(id: number) => handleDelete(id)}
          handleEdit={(id: number) => handleEdit(id)}
        />
      );
    });
  }

  function createNewProduct() {
    navigate('/create');
  }

  return (
    <div>
      {authentication.auth.role == Role.admin && (
        <button
          className='mb-8 h-8 w-36 items-start rounded bg-[#8B8DB2] font-bold md:w-40 md:text-sm'
          onClick={() => createNewProduct()}
        >
          Create New Product
        </button>
      )}
      <div className='grid max-w-screen-2xl items-center gap-32 rounded border border-[#6F6F6F] p-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {createProducts()}
      </div>
    </div>
  );
}

export default ProductList;
