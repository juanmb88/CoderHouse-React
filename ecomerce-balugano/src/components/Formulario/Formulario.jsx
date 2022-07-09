import { useState } from "react";
import { UseCartContext } from "../context/CartContext";
import { createOrder } from "../js/functions";




export default function Formulario () {
    const [customerData, setCustomerData] = useState({});
    const [nameError, setNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [email2Error, setEmail2Error] = useState(false);
    const {totalPrice, cartList, setOrderId, clearCart} = UseCartContext();

    const handleChange = (e) => {
        setCustomerData({
            ...customerData,
            [e.target.name]: e.target.value
        });
    }
    const sendOrder = () => {
        setNameError(!customerData.name);
        setPhoneError(!customerData.phone);
        setEmailError(!customerData.email);
        setEmail2Error(!(customerData.email2 === customerData.email));
        if (customerData.name && customerData.phone && customerData.email && (customerData.email2 === customerData.email)) {
            createOrder( customerData, totalPrice, cartList, setOrderId, clearCart)
        }
    }

    return (
        <>
           
            <div className="cartForm">
                <p className="cartForm__title">Ingrese sus datos:</p>
                <form action="">
                    <input className="cartForm__input" name="name" onChange={(e) => handleChange(e)} type="text" placeholder="Nombre" />
                    {nameError && <span className="cartForm__error">Debe ingresar un nombre</span>}
                    <input className="cartForm__input" name="phone" onChange={(e) => handleChange(e)} type="tel" placeholder="Teléfono" />
                    {phoneError && <span className="cartForm__error">Debe ingresar un teléfono</span>}
                    <input className="cartForm__input" name="email" onChange={(e) => handleChange(e)} type="email" placeholder="Correo eléctronico" />
                    {emailError && <span className="cartForm__error">Debe ingresar un correo electrónico</span>}
                    <input className="cartForm__input" name="email2" onChange={(e) => handleChange(e)} type="email" placeholder="Repita correo electrónico" />
                    {email2Error && <span className="cartForm__error">El correo electrónico no coincide</span>}
                    <textarea className="cartForm__textarea" name="comment" onChange={(e) => handleChange(e)} id="" cols="30" rows="10" placeholder="Escriba aquí sus comentarios..." ></textarea>
                </form>
                <button className="cartForm__button" onClick={clearCart}>Vaciar pedido</button>
                <button className="cartForm__button" onClick={sendOrder}>Enviar pedido</button>
            </div>
        </>
    );
}