import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CartApiHandler from '../api/CartApiHandler';
import ProductApiHandler from '../api/ProductApiHandler';
import useAuth from '../hooks/useAuth';

interface Product {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  category: string;
  description?: string;
}

function Product() {
  const [product, setProduct] = useState<Product>();
  const { id } = useParams();
  const authentication = useAuth();

  useEffect(() => {
    async function fetchProducts() {
      if (id == undefined) return;

      const product: Product | string = await ProductApiHandler.getProductById(
        id
      );

      if (typeof product != 'string') setProduct(product);
    }

    fetchProducts();
  }, []);

  function addToCart() {
    if (id == undefined) return;
    if (!authentication.auth.loggedIn) return;

    const productCount = productCountInCart(id);
    if (productCount != null && productCount > 0) {
      CartApiHandler.changeProductAmountInCart(
        authentication.auth.accessToken,
        id,
        (+productCount + 1).toString()
      );
      authentication.updateCart();
      return;
    }
    CartApiHandler.addProductToCart(authentication.auth.accessToken, id, '1');
    authentication.updateCart();
  }

  function productCountInCart(productId: string) {
    return authentication.cart.find(
      (cartItem) => cartItem.product.id.toString() == productId
    )?.amount;
  }

  return (
    <div className='grid max-h-64 w-9/12 max-w-screen-md grid-cols-4 grid-rows-2 gap-10'>
      <img
        className='col-span-2 row-span-2 h-full justify-self-end rounded'
        src={product?.imageUrl}
        alt=''
      />
      <div>
        <h2 className='mb-1 text-xl'>{product?.name}</h2>
        <h3 className='mb-1.5 text-2xl font-bold'>{`$${product?.price}`}</h3>
        <p className='text-xs text-[#ECECEC]'>{`Category: ${product?.category}`}</p>
      </div>
      <button
        className='max-h-8 w-24 items-start rounded bg-[#97C193] font-bold md:w-28 md:text-sm'
        onClick={addToCart}
      >
        Add to Cart
      </button>
      <p className='col-span-2 text-xs text-[#ECECEC]'>
        {product?.description}
      </p>
    </div>
  );
}

export default Product;
