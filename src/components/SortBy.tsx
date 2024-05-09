import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';

const sortOptions = [
  { name: 'Newest', identifier: 'newest' },
  { name: 'Oldest', identifier: 'oldest' },
  { name: 'Price: Low to High', identifier: 'priceLowToHigh' },
  { name: 'Price: High to Low', identifier: 'priceHighToLow' },
];

interface SortOption {
  name: string;
  identifier: string;
}

interface Props {
  sortOption: SortOption;
  setSortOption(sortOption: SortOption): void;
}

function SortBy(props: Props) {
  return (
    <div className="mb-4 w-48">
      <Listbox value={props.sortOption} onChange={props.setSortOption}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded border border-[#6F6F6F] bg-[#505050] py-1.5 pl-3 pr-10 text-left text-white shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            {({ open }) => (
              <>
                <span className="block text-xs truncate">{`Sort: ${props.sortOption.name}`}</span>
                {!open && (
                  <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
                {open && (
                  <span className="flex absolute inset-y-0 right-0 items-center pr-2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </>
            )}
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded bg-[#505050] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {sortOptions.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-2 pr-2 ${
                      active ? 'bg-gray-500 text-gray-200' : 'text-white'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate text-xs ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default SortBy;
