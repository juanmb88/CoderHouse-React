//aca creo componente principal de la APP que contiene toda la estructura de la  APP
import './App.css';
import NavBar from './components/Menu-Navegacion/NavBar';
import ItemListContainer from './components/itemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Cart from './components/Cart/Cart';
import { CartContextProvider } from './components/Contexts/cartContext';


function App() {


   return (
   <>
      <CartContextProvider>
         <BrowserRouter>  
            <NavBar/>  

            <Routes>
                  < Route path='/' element={ <ItemListContainer/> } />
                  < Route path='/categoria/:categoriaId' element={<ItemListContainer/>} />
                  < Route path='/detalle/:id' element= { <ItemDetailContainer /> } />
                  <Route path="/cart" element={<Cart />} />               

                  < Route path='*' element={ <Navigate to='/' /> } /> 

            </Routes>

         </BrowserRouter>
         </CartContextProvider> 
       </>  
  )
};

export default App;
