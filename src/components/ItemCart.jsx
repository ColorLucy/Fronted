import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import homeColorLucyImg from "../../public/homeColorLucy1.png";

export const ItemCart = ({item}) => {
  const {deleteItemToCard, addItemToCart} = useContext(CartContext);

  const{id} =item;

  return (
    <div>
      <img height="50"
                    weight="80px !important" src={item.detalles[0].imagenes.length > 0 ? item.detalles[0].imagenes[0].url : homeColorLucyImg} alt={item.nombre}/>
      <div>
        <div>
          <p>{item.nombre}</p>
          <div>
            <button onClick={()=> addItemToCart(item)}>Agregrar</button>
            <button onClick={()=> deleteItemToCard(item)}>Retirar</button>
          </div>
        </div>
        <div>
          <div>
            {item.amount}
            <p>Total: ${item.amount * parseFloat(item.detalles[0].precio)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
