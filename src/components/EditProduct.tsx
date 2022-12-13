import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProductApiHandler from '../api/ProductApiHandler';
import useAuth from '../hooks/useAuth';

interface Product {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  category: string;
  description?: string;
}

function EditProduct() {
  const { productId } = useParams();
  const [productData, setProductData] = useState<Product>({
    id: -1,
    name: '',
    category: '',
    description: '',
    imageUrl: '',
    price: 0,
  });

  useEffect(() => {
    async function fetchProduct() {
      if (productId == null) return;

      const product = await ProductApiHandler.getProductById(productId);

      if (typeof product == 'string') return;

      setProductData(product);
    }

    fetchProduct();
  }, []);

  const [showInvalidPriceMsg, setShowInvalidPriceMsg] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const authentication = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setShowInvalidPriceMsg(false);
    setShowErrorMsg(false);

    const { name, value } = event.target;
    setProductData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function areFieldsValid() {
    return productData.price > 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowInvalidPriceMsg(false);
    setShowErrorMsg(false);

    if (!areFieldsValid()) {
      setShowInvalidPriceMsg(true);
      return;
    }

    const response = await ProductApiHandler.updateProduct(
      authentication.auth.accessToken,
      productData
    );
    console.log(response);

    if (typeof response != 'number') {
      // go to intended site and remove the login page from browser history
      navigate(from, { replace: true });
    }
    setShowErrorMsg(true);
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className='flex w-11/12 max-w-2xl flex-col gap-10 rounded border border-[#6F6F6F] py-16 px-8 sm:w-8/12 md:px-24 lg:px-32'
    >
      <h3 className='text-2xl font-bold tracking-wide'>Edit a Product</h3>
      <div>
        <label className='mb-3 block font-bold tracking-wide'>
          Product Name
        </label>
        <input
          className='w-full border border-[#6F6F6F] bg-[#4F4F4F] py-0.5 px-1 outline-none'
          type='text'
          name='name'
          value={productData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className='mb-3 block font-bold tracking-wide'>Category</label>
        <input
          className='w-full border border-[#6F6F6F] bg-[#4F4F4F] py-0.5 px-1 outline-none'
          type='text'
          name='category'
          value={productData.category}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className='mb-3 block font-bold tracking-wide'>
          Description
        </label>
        <input
          className='w-full border border-[#6F6F6F] bg-[#4F4F4F] py-0.5 px-1 outline-none'
          type='text'
          name='description'
          value={productData.description}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className='mb-3 block font-bold tracking-wide'>Image URL</label>
        <input
          className='w-full border border-[#6F6F6F] bg-[#4F4F4F] py-0.5 px-1 outline-none'
          type='text'
          name='imageUrl'
          value={productData.imageUrl}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className='mb-3 block font-bold tracking-wide'>Price</label>
        <input
          className='w-full border border-[#6F6F6F] bg-[#4F4F4F] py-0.5 px-1 outline-none'
          type='number'
          name='price'
          value={productData.price}
          onChange={handleChange}
        />
      </div>

      {showErrorMsg && (
        <p className='-mb-6 text-red-500'>Something went wrong</p>
      )}

      {showInvalidPriceMsg && (
        <p className='-mb-6 text-red-500'>
          Provide a product price higher than zero
        </p>
      )}

      <div className='flex flex-col gap-10 md:flex-row lg:gap-16'>
        <button
          className='w-24 rounded bg-[#97C193] py-1.5 font-bold md:w-20 md:text-sm'
          type='submit'
        >
          Save
        </button>

        <button
          className='w-24 rounded bg-[#C95252] py-1.5 font-bold md:w-20 md:text-sm'
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditProduct;
