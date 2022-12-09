import { createContext, useEffect, useState } from 'react';
import CartApiHandler from '../../api/CartApiHandler';

interface Product {
  category: string;
  description: string;
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

interface CartProduct {
  amount: number;
  product: Product;
}

interface AuthData {
  accessToken: string;
  username: string;
  role: string;
  loggedIn: boolean;
}
interface Auth {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
  cart: CartProduct[];
  updateCart(): void;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext({} as Auth);

export function AuthProvider(props: Props) {
  const [auth, setAuth] = useState({
    accessToken: '',
    username: '',
    role: '',
    loggedIn: false,
  });
  const [cartUpdTrigger, setCartUpdTrigger] = useState(0);
  const [cart, setCart] = useState<CartProduct[]>([] as CartProduct[]);

  useEffect(() => {
    if (!auth.loggedIn) return;

    async function fetchCart() {
      const newCart = await CartApiHandler.getCart(auth.accessToken);
      setCart(newCart);
    }

    if (cartUpdTrigger > 0) setTimeout(fetchCart, 500);
    else fetchCart();
  }, [cartUpdTrigger, auth]);

  function updateCart() {
    setCartUpdTrigger((prev) => prev + 1);
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, cart, updateCart }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
