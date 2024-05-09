import { Link, useNavigate } from 'react-router-dom';
import AccountApiHandler from '../api/AccountApiHandler';
import shoppingBag from '../assets/images/shopping-bag.png';
import useAuth from '../hooks/useAuth';

enum Role {
  user = 'ROLE_USER',
  admin = 'ROLE_ADMIN',
}

function Header() {
  const navigate = useNavigate();
  const authentication = useAuth();

  function handleLogout() {
    authentication.setAuth({
      accessToken: '',
      username: '',
      role: '',
      loggedIn: false,
      attemptLogout: true,
    });
    AccountApiHandler.logout();
  }

  return (
    <header
      className={'fixed grid h-24 w-full grid-cols-3 bg-[#505050] px-10 py-2'}
    >
      <div className="self-end end h-fit">
        {authentication?.auth.loggedIn && (
          <h2 className="text-sm tracking">
            Signed in as:{' '}
            <span className="font-bold">{authentication?.auth.username}</span>{' '}
            {authentication?.auth.role == Role.admin ? '(Admin)' : ''}
          </h2>
        )}
      </div>
      <button
        className="my-auto h-full hover:text-gray-300"
        onClick={() => navigate('/')}
      >
        Home
      </button>
      <div className="flex gap-10 justify-self-end items-center h-full">
        {!authentication?.auth?.loggedIn && (
          <button
            className="py-0.5 px-5 rounded border border-white"
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
        )}
        <button>
          {authentication.auth.loggedIn && (
            <Link
              to="/cart"
              className="flex flex-col justify-center items-center -mr-8 just"
            >
              <div className="flex gap-1 items-end -mt-5">
                <img className="h-fit w-fit" src={shoppingBag} alt="" />
                <p className="pb-2">{authentication?.cart.length}</p>
              </div>
              <p className="text-sm tracking-wide hover:text-gray-300">
                Shopping Cart
              </p>
            </Link>
          )}
        </button>
        {!authentication?.auth.loggedIn && (
          <button
            className="-mt-16 -mr-5 text-xs tracking-wide underline hover:text-gray-300"
            onClick={() => navigate('/register')}
          >
            Sign Up
          </button>
        )}
        {authentication?.auth.loggedIn && (
          <button
            className="-mt-16 -mr-5 text-xs tracking-wide hover:text-gray-300"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
