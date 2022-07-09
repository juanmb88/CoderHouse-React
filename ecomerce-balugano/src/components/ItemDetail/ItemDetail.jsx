import { useCartContext } from '../Contexts/cartContext';
import ItemCount from '../ItemCount/ItemCount';


const ItemDetail = ( {producto} ) => {
    
    const {cartList, addToCart} = useCartContext();
    const onAdd = (cantidad)=>{ addToCart( {...producto,cantidad} ) };
    console.log(cartList);

return (
    
<div className="row">
    
    <div className="col-md-6 mt-5">
          <img src={producto.img} alt="" 
               className="w-50 m-5" 
               style={{ borderRadius:'25px', border:'solid 1px black'}} />
    </div>

    <div className="col-md-6 mt-5" > 

            <div className=" mt-5" >
                <h2> Nombre: { producto.name } </h2>
                <h3> Categoría: { producto.categoria } </h3>
                <h4> Precio: ${ producto.precio } </h4>
            </div>
                        
            <div className="row">
                <div className="col">

                    < ItemCount  initial={1} stock={producto.stock} onAdd={onAdd} data={producto} />

                </div>
            </div>
    </div>
</div>

 )
};
export default ItemDetail;


