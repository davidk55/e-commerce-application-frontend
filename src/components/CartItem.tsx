import { useEffect, useState } from 'react';
import CartApiHandler from '../api/CartApiHandler';
import useAuth from '../hooks/useAuth';

interface Props {
  imageUrl: string;
  name: string;
  category: string;
  price: number;
  id: number;
  amount: number;
  key: number;
}

function CartItem(props: Props) {
  const authentication = useAuth();
  const [amount, setAmount] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {}, [amount]);

  function handleCartItemDelete(productId: number) {
    CartApiHandler.removeProductFromCart(
      authentication?.auth.accessToken,
      productId.toString()
    );
    authentication.updateCart();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setAmount(value);
  }

  function handleSave() {
    CartApiHandler.changeProductAmountInCart(
      authentication.auth.accessToken,
      props.id.toString(),
      amount
    );
    authentication.updateCart();
    setEditing(false);
  }

  return (
    <div
      key={props.key}
      className='grid grid-cols-3 gap-5 md:grid-cols-4 md:gap-10'
    >
      <img className='h-36 justify-self-center' src={props.imageUrl} alt='' />
      <div className='flex flex-col justify-start gap-3 md:col-span-2'>
        <p className='text-lg font-bold'>{props.name}</p>
        <p className='text-xs'>{`Category: ${props.category}`}</p>
        <div className='flex gap-3'>
          <p className='text-sm'>{`Count: ${!editing ? props.amount : ''}`}</p>
          {editing && (
            <input
              className='w-10 border border-[#6F6F6F] bg-[#4F4F4F] py-0.5 px-1.5 text-sm outline-none'
              type='text'
              name='amount'
              value={amount}
              onChange={handleChange}
            />
          )}
        </div>
        {editing && (
          <button
            className='w-24 rounded bg-[#97C193] py-1.5 font-bold md:w-20 md:text-sm'
            onClick={handleSave}
          >
            Save
          </button>
        )}
        {!editing && (
          <button
            className='w-24 rounded bg-[#97C193] py-1.5 font-bold md:w-20 md:text-sm'
            onClick={() => setEditing(true)}
          >
            Edit Count
          </button>
        )}
      </div>
      <div className='flex flex-col justify-around justify-self-end'>
        <p className='text-xl font-bold text-[#ECECEC]'>{`$${props.price}`}</p>
        <button
          className='h-8 w-24 rounded bg-[#C95252] font-bold md:w-28 md:text-sm'
          onClick={() => handleCartItemDelete(props.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CartItem;
