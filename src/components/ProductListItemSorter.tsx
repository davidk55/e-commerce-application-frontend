import React from 'react';

interface Props {
  children: React.ReactNode;
  sortIdentifier: string;
}

function ProductListItemSorter(props: Props) {
  return (
    <>
      {props.sortIdentifier == 'newest' &&
        React.Children.toArray(props.children).reverse()}
      {props.sortIdentifier == 'oldest' &&
        React.Children.toArray(props.children)}
      {props.sortIdentifier == 'priceLowToHigh' &&
        React.Children.toArray(props.children).sort((a: any, b: any) => {
          const priceA = a?.props.price;
          const priceB = b?.props.price;

          if (priceA > priceB) return 1;
          if (priceA < priceB) return -1;

          return 0;
        })}
      {props.sortIdentifier == 'priceHighToLow' &&
        React.Children.toArray(props.children).sort((a: any, b: any) => {
          const priceA = a?.props.price;
          const priceB = b?.props.price;

          if (priceA > priceB) return -1;
          if (priceA < priceB) return 1;

          return 0;
        })}
    </>
  );
}

export default ProductListItemSorter;
