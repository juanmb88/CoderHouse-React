import { useState } from 'react';

 const ItemCount = ({stock, initial, onAdd, producto }) => {
 const [count, setCount]  = useState(initial);


 function incrementar(){  
    if(count < stock){ setCount( count + 1 ) }
   };

 function decrementar(){ 
     if(count <= 1) { return 1 }
    setCount( count - 1 )
  };
  
const agregar = () => {  onAdd(count) };

function reset() { setCount(1) };

 return (
    <div>
        <div>       
            <div className=" text-center" >
                <div>
                  <hr />

                  <button className="btn btn-sm btn-warning " onClick={decrementar}>  -  </button> 
                  <button className="btn btn-success m-2" onClick={agregar}  > agregar al carrito </button> 
                  <button className="btn btn-sm btn-warning " onClick={incrementar}>  +  </button>
                  <button className="btn btn-sm btn-danger  m-1" onClick={reset}> Reset </button>

                </div>
                <h5>Cantidad : {count}</h5>
            </div>
        </div>
    </div>

  )
};

export default ItemCount;



