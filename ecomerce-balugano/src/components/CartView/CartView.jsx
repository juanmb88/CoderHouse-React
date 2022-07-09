import {Container, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useCartContext } from '../Contexts/cartContext';
import Cart from '../Cart/Cart';

const CartView = () => {
  const {cartList} = useCartContext()
  
  console.log(cartList)
  return (
    <Container>
      {
        cartList.length === 0 ? 
        <div className=" d-flex justify-content-center flex-column align-items-center mt-5">
          <h1 className='text-center'>Carrito de Compras</h1>
          <LinkContainer to="/">
            <Button variant="danger">Ir al Inicio</Button>
          </LinkContainer>
        </div> :
           <div className="mt-5">
           <h1 className='text-center'>Carrito de Compras</h1>
           <Cart/>
          </div>
      }
      </Container>

  )
};

export default CartView;