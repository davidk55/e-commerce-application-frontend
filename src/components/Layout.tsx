import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function Layout() {
  return (
    <>
      <Header />
      <main className='mt-48 flex items-center justify-center'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
