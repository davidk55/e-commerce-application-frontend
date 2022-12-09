import { useNavigate } from 'react-router-dom';

interface Props {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  category: string;
}

function ProductListItem(props: Props) {
  const navigate = useNavigate();

  function handleNavigation() {
    navigate(`/Product/${props.id}`);
  }

  return (
    <button className='text-left' onClick={handleNavigation}>
      <img className='mb-3 h-40 rounded' src={props.imageUrl} />
      <p className='mb-2 text-sm'>{props.name}</p>
      <p className='mb-3 text-xl'>{`$${props.price}`}</p>
      <p className='text-xs text-[#ECECEC]'>{`Category: ${props.category}`}</p>
    </button>
  );
}

export default ProductListItem;
