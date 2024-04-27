import { createContext, useEffect, useState } from "react";

export const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(()=>{
        try{
            const productsInLocalStorage = localStorage.getItem("CartProducts")
            return productsInLocalStorage ? JSON.parse(productsInLocalStorage) : [];
        } catch (error){
            return [];
        }
    });

    useEffect(()=>{
        localStorage?.setItem("cartProducts", JSON.stringify(cartItems));
        console.log("myItems on cart",cartItems);
    }, [cartItems]);

    const addItemToCart = (product) => {
        // console.log("prueba product ", product)
        const inCart = cartItems.find((productInCart) => productInCart.id === product.id);
        // console.log("prueba items", inCart)
        if(inCart){
            setCartItems(
                cartItems.map((productInCart)=>{ 
                    if(productInCart.id === product.id){
                        return { ...inCart, amount: inCart.amount +1}
                    } else return productInCart
                })
            )
        }else{
            setCartItems([...cartItems,{...product, amount: 1}])
        }
    };

    const deleteItemToCart = (product) =>{
        const inCart = cartItems.find(
            (productInCart)=> productInCart.id ===product.id
        );

        if(inCart.amount === 1){
            setCartItems(
               cartItems.filter((productInCart)=> productInCart.id !== product.id)
            )
        }else{
            setCartItems((productInCart)=>{
                if(productInCart.id === product.id){
                    return {...inCart, amount: inCart.amount - 1}
                }else return productInCart;
            })
        }
    };
    
    return(
        <CartContext.Provider value= {{cartItems, addItemToCart, deleteItemToCart}}>
            {children}
        </CartContext.Provider>
    );
};

