import { useEffect, useState } from 'react';

interface Props {
  inputName: string;
  type: string;
  errorMessage: string;
  validator(value: string): boolean;
  trigger?: number;
}

function RegisterInput(props: Props) {
  const [data, setData] = useState({
    value: '',
    focus: false,
    hadFocus: false,
    validationPassed: false,
  });

  useEffect(() => {
    setData((prevData) => {
      return {
        ...prevData,
        validationPassed: props.validator(data.value),
      };
    });
  }, [data.value, props.trigger]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setData((prevData) => {
      return {
        ...prevData,
        value: value,
      };
    });
  }

  return (
    <div className="mb-8">
      <label className="block mb-3 font-bold tracking-wide">
        {props.inputName}
      </label>
      <input
        className={`w-full border border-[#6F6F6F] bg-[#4F4F4F] py-0.5 px-1 outline-none ${
          data.hadFocus && !data.validationPassed ? 'border-red-500' : ''
        }`}
        type={props.type}
        value={data.value}
        onChange={handleChange}
        onBlur={() =>
          setData((prevData) => {
            return {
              ...prevData,
              hadFocus: true,
            };
          })
        }
      />
      {data.hadFocus && !data.validationPassed && (
        <p className="mt-1.5 text-red-500">{props.errorMessage}</p>
      )}
    </div>
  );
}

export default RegisterInput;
