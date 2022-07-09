import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";
import {doc, getDoc, getFirestore} from 'firebase/firestore'

const ItemDetailContainer = () => {
    const [ loanding, setLoanding ] = useState(true);
    const [producto, setProducto] = useState([]);

    const{ id } = useParams();


     useEffect(() => {
        const db = getFirestore();
        const queryProducto = doc(db, 'productos', id);
        getDoc(queryProducto)//getDoc es una promesa
            .then(resp => setProducto( { id: resp.id, ...resp.data() }))//data(), funcion q extrae hacia afuera datos
            .catch(err => console.log(err))
            .finally(()=>setLoanding(false))  
       
      }, [id])

      console.log(producto)

return(

    <div >
        { loanding  ? 
                <h1 className="text-center  d-flex justify-content-center mt-5 ">Cargando...</h1>
              :        
        <ItemDetail producto={ producto }/>  
    }                  
    </div>  
  )
};

export default ItemDetailContainer;