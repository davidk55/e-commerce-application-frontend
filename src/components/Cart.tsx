import { useNavigate } from 'react-router-dom';
import CartApiHandler from '../api/CartApiHandler';
import useAuth from '../hooks/useAuth';
import CartItem from './CartItem';

function Cart() {
  const authentication = useAuth();
  const navigate = useNavigate();

  function handleCartItemDelete(productId: number) {
    CartApiHandler.removeProductFromCart(
      authentication?.auth.accessToken,
      productId.toString()
    );
    authentication.updateCart();
  }

  function createCartItems() {
    return authentication.cart.map((cartProd, idx) => {
      return (
        <CartItem key={idx} {...cartProd.product} amount={cartProd.amount} />
      );
    });
  }

  return (
    <div className='flex w-11/12 max-w-screen-lg flex-col gap-20 rounded border border-[#6F6F6F] p-8 sm:w-10/12 lg:p-16'>
      {createCartItems()}
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
