import { Link } from 'react-router-dom';

export const Item = ({prod}) => {

return (
  <div style={{display:'flex',alignitems: 'center', flexDirection:'row', 
      flexWrap:'wrap',justifyContent:'center' }} >

        <div className="card m-2 " >
              <div className="card-body">
                      <h5 className="card-title  text-secondary ">{prod.name}</h5>
                      <img src={prod.img} 
                          alt="aca" 
                          className="rounded"  
                          style={{maxWidth: '200px',display:'flex' , justifyContent:'center', alignitems:'center'}}
                      />

                        <div className='d-flex justify-content-around mt-3'>
                          <Link to={`/detalle/${prod.id}`} >
                              <button className="btn btn-primary btn-sm m-2" >Detalle Producto</button>
                          </Link>
                        
                          <p className="card-text text-dark">$ {prod.precio}</p>
                        
                        </div>  
              </div>
        </div>
  </div>
  )
};