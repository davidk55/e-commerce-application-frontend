import { Link, useNavigate } from 'react-router-dom';
import shoppingBag from '../assets/images/shopping-bag.png';
import useAuth from '../hooks/useAuth';

enum Role {
  user = 'ROLE_USER',
  admin = 'ROLE_ADMIN',
}

function Header() {
  const navigate = useNavigate();
  const authentication = useAuth();

  return (
    <header
      className={'fixed grid h-24 w-full grid-cols-3 bg-[#505050] px-10 py-2'}
    >
      <div className='end h-fit self-end'>
        {authentication?.auth.loggedIn && (
          <h2 className='tracking text-sm'>
            Signed in as:{' '}
            <span className='font-bold'>{authentication?.auth.username}</span>{' '}
            {authentication?.auth.role == Role.admin ? '(Admin)' : ''}
          </h2>
        )}
      </div>
      <button
        className='my-auto h-full hover:text-gray-300'
        onClick={() => navigate('/')}
      >
        <h1>Home</h1>
      </button>
      <div className='flex h-full items-center gap-10 justify-self-end'>
        {!authentication?.auth?.loggedIn && (
          <button
            className='rounded border border-white px-5 py-0.5'
            onClick={() => navigate('/login')}
          >
            Sign In
          </button>
        )}
        <button>
          <Link
            to='/cart'
            className='just -mr-8 flex flex-col items-center justify-center'
          >
            {' '}
            <div className='-mt-5 flex items-end gap-1'>
              <img className='h-fit w-fit' src={shoppingBag} alt='' />
              <p className='pb-2'>{authentication?.cart.length}</p>
            </div>
            <p className='text-sm tracking-wide'>Shopping Cart</p>
          </Link>
        </button>
        {!authentication?.auth.loggedIn && (
          <button
            className='-mt-16 -mr-5 text-xs tracking-wide underline'
            onClick={() => navigate('/register')}
          >
            Sign Up
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;