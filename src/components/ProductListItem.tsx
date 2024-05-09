import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface Props {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  category: string;
  handleDelete(productId: number): void;
  handleEdit(productId: number): void;
}

enum Role {
  user = 'ROLE_USER',
  admin = 'ROLE_ADMIN',
}

function ProductListItem(props: Props) {
  const navigate = useNavigate();
  const authentication = useAuth();

  function handleNavigation() {
    navigate(`/Product/${props.id}`);
  }

  return (
    <div className="flex flex-col gap-5">
      <button className="text-left" onClick={() => handleNavigation()}>
        <img className="mb-3 h-40 rounded" src={props.imageUrl} />
        <p className="mb-2 text-sm">{props.name}</p>
        <p className="mb-3 text-xl">{`$${props.price.toFixed(2)}`}</p>
        <p className="text-xs text-[#ECECEC]">{`Category: ${props.category}`}</p>
      </button>
      {authentication.auth.role == Role.admin && (
        <div>
          <button
            className=" mr-5 w-24 rounded bg-[#97C193] py-1 text-sm font-bold"
            onClick={() => props.handleEdit(props.id)}
          >
            Edit
          </button>
          <button
            className=" w-24 rounded bg-[#C95252] py-1 text-sm font-bold"
            onClick={() => props.handleDelete(props.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductListItem;
