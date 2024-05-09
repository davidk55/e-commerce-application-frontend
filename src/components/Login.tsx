import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountApiHandler from '../api/AccountApiHandler';
import CartApiHandler from '../api/CartApiHandler';
import useAuth from '../hooks/useAuth';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showInvalidLoginMessage, setShowInvalidLoginMessage] = useState(false);
  const authentication = useAuth();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setShowInvalidLoginMessage(false);
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowInvalidLoginMessage(false);

    const userResponse = await AccountApiHandler.login(
      formData.username,
      formData.password,
    );
    const cartResponse = await CartApiHandler.getCart(
      userResponse?.AccessToken,
    );

    if (typeof userResponse != 'number' || typeof cartResponse != 'number') {
      authentication.setAuth({
        accessToken: userResponse?.AccessToken,
        username: formData.username,
        role: userResponse?.Role,
        loggedIn: true,
        attemptLogout: false,
      });

      // go to intended site and remove the login page from browser history
      navigate(from, { replace: true });
    }

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        password: '',
      };
    });

    setShowInvalidLoginMessage(true);
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex w-11/12 max-w-2xl flex-col gap-10 rounded border border-[#6F6F6F] py-16 px-8 sm:w-8/12 md:px-24 lg:px-32"
    >
      <h3 className="text-2xl font-bold tracking-wide">Login</h3>
      <div>
        <label className="block mb-3 font-bold tracking-wide">Email</label>
        <input
          className="w-full border border-[#6F6F6F] bg-[#4F4F4F] py-0.5 px-1 outline-none"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block mb-3 font-bold tracking-wide">Password</label>
        <input
          className="w-full border border-[#6F6F6F] bg-[#4F4F4F] py-0.5 px-1 outline-none"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      {showInvalidLoginMessage && (
        <p className="-mb-6 text-red-500">
          The given credentials were wrong. Please try again
        </p>
      )}
      <div className="flex flex-col gap-10 md:flex-row lg:gap-16">
        <button
          className="w-24 rounded bg-[#97C193] py-1.5 font-bold md:w-20 md:text-sm"
          type="submit"
        >
          Login
        </button>

        <button
          className="w-24 rounded bg-[#C95252] py-1.5 font-bold md:w-20 md:text-sm"
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default Login;
