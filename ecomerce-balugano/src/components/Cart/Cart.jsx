import { useCartContext } from "../Contexts/cartContext"
import {Container, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {  collection, doc, documentId, getDocs, getFirestore, query, where, writeBatch } from "firebase/firestore";
import { useState } from "react";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";


const Cart = () => {

  const [ loanding, setLoanding ] = useState(false);
  const { cartList,  totalPrice, clearList, removeProduct} = useCartContext();
  const MySwal = withReactContent(Swal);
  
  async function generarOrden(e){
    
  try {
      
      e.preventDefault();
      setLoanding(true);
      const db = getFirestore();
      const batch = writeBatch(db);
      let orden = {};
    
        orden.buyer = { name : e.target.name.value, 
                        email: e.target.email.value,
                        codPostal: e.target.postalcode.value,
                        address: e.target.address.value,
                        phone: e.target.phone.value,
                        dni: e.target.dni.value
                      };

        orden.total = totalPrice();
    
        orden.productos = cartList.map( producto => {
            const id = producto.id
            const nombre = producto.nombre
            const precio = producto.precio * producto.cantidad
              return ( id, nombre, precio )
        }); 
        
        /////insertar a firebase colleccion////////
        const orderCollection = collection(db, 'ordenes');
        const orderRef = doc(orderCollection);
        const resOrder = batch.set(orderRef, orden);
        const idOrden = resOrder._mutations[0].key.path.segments[1];  
        console.log(idOrden)      
    
        //////Actualizar Stock//////////////
        const queryCollectionStock = collection(db, 'productos')
        const queryActualizarStock = await query(//query, para consultas, filtras, consultas condicionadas
        queryCollectionStock,
        where(documentId(), 'in', cartList.map(it => it.id))//documentId trae todos los id q esten en productos
        );
          
          await getDocs(queryActualizarStock)
          .then(resp => resp.docs.forEach(res=>batch.update(res.ref, {
            stock: res.data().stock - cartList.find(producto =>producto.id === res.id).cantidad
          })))
          .finally(clearList());

          await batch.commit();
    
          setLoanding(false);

          ///////Alerta de Compra//////////
          return MySwal.fire({
            title: <h2>Compra Realizada con Exito!</h2>,
            html: (
              <>
                <b>Código de Envio:</b>
                <strong> {idOrden} </strong>
              </>
            ),
            icon: "success",
          });
 

  } catch (error) {
        setLoanding(false);
        console.log(error);
         ///////Alerta de Compra Error//////////
        return new MySwal({
          text: <h2> Algo salió mal, por favor, intenta nuevamente </h2>,
          icon: "error",
        })
      };  
}; 


return (
        
<Container>
    {
        cartList.length === 0   ? 

        <div className=" d-flex justify-content-center flex-column align-items-center mt-5 border border-4 border-dark rounded ''">
          <h1 className='text-center '>Carrito de Compras</h1>
          <hr />
          <h3 className="text-center mt-4">Ups...!  <strong className="text-danger text-opacity-50">Carrito Vacio</strong> </h3>
          <LinkContainer to="/">
            <Button variant="btn btn-outline-dark m-2">Volver al Menu</Button>
          </LinkContainer>
        </div>
         :

      <>

      <div className="mt-5">
          <h1 className='text-center'>Carrito de Compras</h1>
          <div className="col-12 d-flex text-center">
              <ul className="col-md-8"> 
                  {
                    cartList.map( producto => 
                    <li className="col-12 " key={producto.id} style= { {listStyleType: 'none'} } >
                          <div className="row col-12 ">
                              <div className="mt-2">

                                  <div className="d-flex justify-content-between align-items-center border border-3 border-dark rounded-5">
                                          < img src={producto.img} alt="Img" 
                                                style={{width: '190px', borderRadius:'25px'}} />
                                          
                                          < h4 className="m-3">Nombre {producto.name} </h4>
                                          < h4 className="m-3"> Unidad  {producto.cantidad}</h4>
                                          < h4 className="m-3">$ {producto.precio * producto.cantidad}</h4> 
                                  </div>
                                          < button href="/" 
                                                  className="btn btn-outline-dark btn-sm justify-content-center m-1"
                                                  onClick={()=>{removeProduct(producto.id)}}>Eliminar
                                          </button>
                                                  
                              </div>  
                                 <hr />      
                          </div>             

                    </li> 
                     )
                  }

              </ul >
              <div className="col-md-4">
                
                  <div id="accordionData">
                        <div className="cart__ship text-center">
                            <h2 className="text-leftline" id="panelsStayOpen-headingOne">  Entrega  </h2>
    
                            <div className="m-4">
                              <h5>Total a pagar: $ {totalPrice()}</h5>
                            </div>
                        </div>

                          <form id="formPurchase"  onSubmit = { generarOrden } >
                            <div className="cart__personal mt-5">
                                  <h2 className="text-leftline mb-1" id="panelsStayOpen-headingTwo">
                                    <button
                                      className="accordion-button"
                                      type="button"
                                      data-bs-toggle="collapse"
                                      data-bs-target="#panelsStayOpen-collapseTwo"
                                      aria-expanded="true"
                                      aria-controls="panelsStayOpen-collapseTwo"
                                      >
                                            <button className="btn btn-primary border border-2 position-absolute top-40 start-50 translate-middle">
                                              Datos del Destinatario
                                            </button>
                                    </button>
                                  </h2>
                              <div
                                id="panelsStayOpen-collapseTwo"
                                className="accordion-collapse collapse show m-4"
                                aria-labelledby="panelsStayOpen-headingTwo"
                                >
                                        
                                  <input type="text" name="name" className="form__input" placeholder="Nombre y Apellido" required />
                                  <input type="email" name="email" className="form__input" placeholder="Email" required />
                                    <div >
                                      <input
                                        type="number"
                                        name="postalcode"
                                        className="form__input m-1"
                                        placeholder="Código Postal"
                                        required
                                        />
                                    </div>
                                  <input type="text" name="address" className="form__input" placeholder="Domicilio" required />       
                                  <input type="tel" name="phone" className="form__input" placeholder="Télefono" required />
                              </div>
                            </div>
                            <div className="cart__fact mt-5">

                                <h2 className="text-leftline mb-4" id="panelsStayOpen-headingThree">
                                  <button
                                    className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#panelsStayOpen-collapseThree"
                                    aria-expanded="true"
                                    aria-controls="panelsStayOpen-collapseThree"
                                    >
                                      <button className="btn btn-primary border border-2 position-absolute top-40 start-50 translate-middle">
                                                  Datos del Facturacion
                                      </button>
                                  </button>
                                </h2>
                                <div
                                  id="panelsStayOpen-collapseThree"
                                  className="accordion-collapse collapse show"
                                  aria-labelledby="panelsStayOpen-headingThree"
                                  >
                                  <input type="number" name="dni" className="form__input" placeholder="DNI ó CUIL" required />               
                                </div>

                            </div>
                            <button
                              type="submit"
                              className="btn btn-success mt-5 w-100"
                              aria-label="Pagar"
                              >
                                  { loanding ? "Procesando compra..." : "Pagar" }
                            </button>
                            
                          </form>
                  </div> {/*  fin div  accordionData */}

                </div>
            
          </div>
         <button className="col-12 btn btn-outline-danger m-2"  onClick={clearList} > Vaciar Carrito </button>

      </div> 
      </>
    }
</Container>
  )
};
export default Cart;
