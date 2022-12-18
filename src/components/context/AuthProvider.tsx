import { createContext, useEffect, useState } from 'react';
import CartApiHandler from '../../api/CartApiHandler';
import useRefreshToken from '../../hooks/useRefreshToken';

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
  attemptLogout: boolean;
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
    attemptLogout: false,
  });
  const [cartUpdTrigger, setCartUpdTrigger] = useState(0);
  const [cart, setCart] = useState<CartProduct[]>([] as CartProduct[]);
  const refresh = useRefreshToken();

  useEffect(() => {
    async function tryReAuthenticate() {
      const refreshResponse = await refresh();

      if (typeof refreshResponse == 'number') return;
      if (auth.attemptLogout) return;

      const jwtContent = parseJwt(refreshResponse);
      setAuth({
        accessToken: refreshResponse,
        username: jwtContent.sub ?? '',
        role: jwtContent?.authorities[0]?.authority ?? '',
        loggedIn: true,
        attemptLogout: false,
      });
    }

    if (!auth.loggedIn) tryReAuthenticate();

    if (auth.accessToken == '') {
      setCart([]);
      return;
    }

    async function fetchCart() {
      const newCart = await CartApiHandler.getCart(auth.accessToken);
      setCart(newCart);
    }

    if (cartUpdTrigger > 0) setTimeout(fetchCart, 300);
    else fetchCart();
  }, [cartUpdTrigger, auth]);

  function updateCart() {
    setCartUpdTrigger((prev) => prev + 1);
  }

  function parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, cart, updateCart }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
