import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';
import {collection, getDocs, getFirestore, query, where} from 'firebase/firestore';


function ItemListContainer(){
      const [productos, setProductos] = useState([]);
      const [ loanding, setLoanding ] = useState(true);
      const {categoriaId} = useParams();
    

 useEffect(() => {

    const db = getFirestore();
    const queryCollection = collection(db, 'productos');

    if(categoriaId){

        const queryCollectionFilter = query(queryCollection,   where('categoria', '==', categoriaId)  )
        getDocs(queryCollectionFilter)
        .then(respuesta => setProductos( respuesta.docs.map( item => ( { id: item.id, ...item.data() } ) ) ))
        .catch(err => console.log(err))
        .finally(()=> setLoanding(false))

    }else{
        getDocs(queryCollection)
        
        .then(respuesta => setProductos( respuesta.docs.map( item => ( { id: item.id, ...item.data() } ) ) ))
        .catch(err => console.log(err))
        .finally(()=> setLoanding(false))
    }
}, [categoriaId])

return (
  <header className='App-header'>
    <h1>Greeting</h1>
       <div>
            <div >
              {  loanding  ?  <h1>Cargando...</h1>  :  <ItemList productos={productos}  />  }                   
            </div>  
      </div>    
    </header>      
  )
};

export default ItemListContainer;