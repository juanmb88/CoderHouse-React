import { Item } from "../Item/Item";

function ItemList({productos}){

  return (
        <header className='App-header'>

          <div style={{display:'flex',alignitems: 'center', flexDirection:'row', 
                flexWrap:'wrap',justifyContent:'center' }} >

              { productos.map( prod =>  < Item key={prod.id} prod={prod} /> )}
              
          </div>
        </header>      
      )
    };  
  export default ItemList;