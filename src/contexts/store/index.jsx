import React, { createContext, useEffect, useState } from 'react';

export const StoreContext = createContext();

export const StoreProvider = (props) => {
  const [total, setTotal] = useState(0);
  const [quantityTotal, setQuantityTotal] = useState(0);
  const [company, setCompany] = useState({});
  const [bag, setBag] = useState(null);

  const saveProduct = async (product) => {
    let bagSaved = await localStorage.getItem('bag');
    bagSaved = JSON.parse(bagSaved)
    if (bagSaved?.products.length) {
      const products = bagSaved.products;
      localStorage.setItem('bag', JSON.stringify({ products: [...products, product] }));
    } else {
      localStorage.setItem('bag', JSON.stringify({ products: [product] }));
    };
    
    getTotal();
  };

  const getTotal = async () => {
    let bag = await localStorage.getItem('bag');
    bag = JSON.parse(bag);
    
    const products = bag?.products || [];

    if (products.length) {
      setBag(products);
      setTotal([...products].reduce((acc, item) =>  acc += item.total, 0));
      setQuantityTotal([...products].reduce((acc, item) =>  acc += item.quantity, 0));
    }
  };

  const getBag = async () => {
    let bag = await localStorage.getItem('bag');
    bag = JSON.parse(bag);
    return bag || {};
  };

  useEffect(() => {
    getTotal();
  }, [])

  return (
    <StoreContext.Provider value={{ saveProduct, total, quantityTotal, getBag, company, setCompany }}>
      {props.children}
    </StoreContext.Provider>
  );
};
