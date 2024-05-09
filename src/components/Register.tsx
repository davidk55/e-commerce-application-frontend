import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountApiHandler from '../api/AccountApiHandler';
import CartApiHandler from '../api/CartApiHandler';
import useAuth from '../hooks/useAuth';
import RegisterInput from './RegisterInput';

function Register() {
  const validator = {
    emailValidator:
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    passwordValidator:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
  };

  const inputs = [
    {
      inputName: 'E-mail',
      errorMessage: 'Enter a valid E-mail address',
      type: 'text',
      validator: validateEmail,
    },
    {
      inputName: 'Password',
      errorMessage:
        'The password should be 8-30 characters and include at least 1 lower case letter, 1 upper case letter, 1 number and 1 special character.',
      type: 'password',
      validator: validatePassword,
    },
    {
      inputName: 'Confirm Password',
      errorMessage: 'Passwords do not match',
      type: 'password',
      validator: validateConfirmPassword,
    },
  ];

  const navigate = useNavigate();
  const formData = useRef({
    username: '',
    password: '',
  });
  const authentication = useAuth();

  const [passwordChangeTrigger, setPasswordChangeTrigger] = useState(0);
  const areAllInputsValid = useRef({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [showMessage, setShowMessage] = useState({
    invalidField: false,
    userExist: false,
  });

  function validateEmail(value: string) {
    setShowMessage({ userExist: false, invalidField: false });

    formData.current.username = value;

    const isEmailValid = validator.emailValidator.test(value);
    areAllInputsValid.current.email = isEmailValid;

    return isEmailValid;
  }

  function validatePassword(value: string) {
    setShowMessage({ userExist: false, invalidField: false });

    formData.current.password = value;
    setPasswordChangeTrigger((prev) => prev + 1);

    const isPasswordValid = validator.passwordValidator.test(value);
    areAllInputsValid.current.password = isPasswordValid;

    return isPasswordValid;
  }

  function validateConfirmPassword(value: string) {
    setShowMessage({ userExist: false, invalidField: false });

    const isConfirmedPasswordValid = formData.current.password == value;
    areAllInputsValid.current.confirmPassword = isConfirmedPasswordValid;

    return isConfirmedPasswordValid;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { email, password, confirmPassword } = areAllInputsValid.current;
    if (!email || !password || !confirmPassword) {
      setShowMessage({ userExist: false, invalidField: true });
      return;
    }

    setShowMessage({ userExist: false, invalidField: false });

    const response = await AccountApiHandler.register(
      formData.current.username,
      formData.current.password,
    );
    if (typeof response == 'number') {
      setShowMessage({ userExist: true, invalidField: false });
      return;
    }

    const userResponse = await AccountApiHandler.login(
      formData.current.username,
      formData.current.password,
    );
    const cartResponse = await CartApiHandler.getCart(
      userResponse?.AccessToken,
    );

    if (typeof userResponse != 'number' || typeof cartResponse != 'number') {
      authentication.setAuth({
        accessToken: userResponse?.AccessToken,
        username: formData.current.username,
        role: userResponse?.Role,
        loggedIn: true,
        attemptLogout: false,
      });

      // go to intended site and remove the login page from browser history
      // navigate(from, { replace: true });
    }
    navigate('/');
  }

  function handleCancel() {
    navigate('/');
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex w-11/12 max-w-2xl flex-col gap-10 rounded border border-[#6F6F6F] py-16 px-8 sm:w-8/12 md:px-24 lg:px-32"
    >
      <h3 className="text-2xl font-bold tracking-wide">Register</h3>
      <div>
        {inputs.map((input, idx) => {
          return (
            <RegisterInput
              key={idx}
              inputName={input.inputName}
              type={input.type}
              errorMessage={input.errorMessage}
              validator={input.validator}
              trigger={
                input.inputName == 'Confirm Password'
                  ? passwordChangeTrigger
                  : undefined
              }
            />
          );
        })}
        {showMessage.invalidField && (
          <p className="mb-2 text-red-500">
            In order to continue correct the invalid fields
          </p>
        )}
        {showMessage.userExist && (
          <p className="mb-2 text-red-500">User exist already</p>
        )}
        <div className="flex flex-col gap-10 md:flex-row lg:gap-16">
          <button
            className="w-24 rounded bg-[#97C193] py-1.5 text-sm font-bold"
            type="submit"
          >
            Register
          </button>

          <button
            className="w-24 rounded bg-[#C95252] py-1.5 text-sm font-bold"
            type="button"
            onClick={() => handleCancel()}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default Register;
