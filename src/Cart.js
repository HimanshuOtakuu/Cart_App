import React from 'react';
import CartItem from './CartItem';
  

class Cart extends React.Component {
    constructor () {
        super();
        this.state ={
            products:[
                {
                    price: 999,
                    title: 'Mobile Phone',
                    qty: 1,
                    img: '',
                    productId: 1
                },
                {
                    price: 1999,
                    title: 'Laptop',
                    qty: 1,
                    img: '',
                    productId: 2
                },
                {
                    price: 99,
                    title: 'Watch',
                    qty: 1,
                    img: '',
                    productId: 3
                }
            ]
        }
    }

    render(){
        const { products } = this.state;
        return(
            <div className = "cart">
                {products.map((product) => {
                    return (
                        <CartItem 
                            product = {product} 
                            key = {product.productId} 
                            />
                        )
                }
                )}
            </div>
        )
    }
}

export default Cart;