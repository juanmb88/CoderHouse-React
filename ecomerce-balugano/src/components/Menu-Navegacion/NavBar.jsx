import IconoCarrito from '../imagenes/icono-carrito.svg'
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function NavBar() {
   
  return (   
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">

                  <h2 className="navbar mt-1" href="https://reactjs.org">Tienda de Juan</h2>

                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"       aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">

                          <li className="nav-item">
                                <NavLink to="list"
                                className="nav-link fs-5" 
                                //className= {({activa})=>  activa ? 'estilosActiva' : 'estilosDesactiva'}
                                  aria-current="page" 
                                  href="https://reactjs.org">Inicio
                                </NavLink>
                          </li>
                          <li className="nav-item">
                              <NavLink to="/categoria/sonido"
                                className="nav-link fs-5" 
                                //className= {({activa})=>  activa ? 'estilosActiva' : 'estilosDesactiva'}
                                  aria-current="page" 
                                  href="https://reactjs.org">Sonido
                              </NavLink>
                          </li>
                          <li className="nav-item">
                              <NavLink to="/categoria/imagen"
                                className="nav-link fs-5" 
                                //className= {({activa})=>  activa ? 'estilosActiva' : 'estilosDesactiva'}
                                  aria-current="page" 
                                  href="https://reactjs.org">Imagen
                                </NavLink>
                          </li>
                        
                        </ul>
                  </div>

                  <div className='text-center w-10'>
                      <Link to="/cart">
                        <button  className='btn btn-outline-success opacity-75 rounded'> 
                          <img src={IconoCarrito} className="justify-content-center" alt="iconoCarrito" /> 
                        </button>
                      </Link>
                  </div> 
          
            </div>
        </nav>
    )
  };
  export default NavBar;