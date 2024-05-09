import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

function Layout() {
  return (
    <>
      <Header />
      <main className="flex justify-center items-center mt-48">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
