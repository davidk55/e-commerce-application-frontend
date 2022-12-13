import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import CartItem from './CartItem';

function Cart() {
  const authentication = useAuth();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let totalPrice = 0;
    authentication.cart.forEach(
      (cartProd) => (totalPrice += cartProd.product.price * cartProd.amount)
    );
    setTotalPrice(totalPrice);
  }, [authentication.cart]);

  function createCartItems() {
    return authentication.cart.map((cartProd, idx) => {
      return (
        <CartItem key={idx} {...cartProd.product} amount={cartProd.amount} />
      );
    });
  }

  return (
    <div className='flex w-11/12 max-w-screen-lg flex-col gap-10 rounded border border-[#6F6F6F] p-8 sm:w-10/12 lg:p-16'>
      {createCartItems()}
      {authentication.cart.length > 0 && (
        <p className='text-xl font-bold text-[#ECECEC]'>
          {`Total: $${totalPrice.toFixed(2)}`}
        </p>
      )}
      {authentication.cart.length == 0 && <p>No Items in cart</p>}
      {authentication.cart.length > 0 && (
        <button
          className='h-10 w-48 rounded bg-[#E3C733] font-bold md:text-sm'
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}

export default Cart;
