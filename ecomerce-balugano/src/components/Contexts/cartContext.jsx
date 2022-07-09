import { createContext, useState, useContext } from 'react';

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

export const CartContextProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  const addToCart = (objProducto) => {
   
    let carritoprevio = [...cartList];
    
    if ( carritoprevio.some((item) => item.id === objProducto.id) ) {
      
        carritoprevio.find((item) => item.id === objProducto.id).cantidad += objProducto.cantidad;
        setCartList([...carritoprevio]);
      } else {
        setCartList([...cartList, objProducto]);
      }
      
  };
  
  const clearList = () => {
  setCartList([])
};
  
  const totalPrice = () => {
    let total = 0
     cartList.forEach((nuevoProducto)=>{
      total += nuevoProducto.precio * nuevoProducto.cantidad
    }); 
    return total
  };
  
  const removeProduct = (id) => {
    setCartList(cartList.filter((newProducto) => newProducto.id !== id));
  };
  
  const iconCart = () => cartList.reduce((acum, valor) => acum + valor.cantidad, 0);
  
  return (
    <CartContext.Provider
      value={{
        cartList,
        setCartList,
        addToCart,
        clearList,
        totalPrice,
        removeProduct,
        iconCart,
      }}
      >
        {children}
    </CartContext.Provider>
  );
};