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
    handleIncreaseEvent = (product) =>{
        const {products} = this.state;
        const index = products.indexOf(product);
        products[index].qty += 1;

        this.setState({
            products: products
        })
    }
    handleDecreaseEvent = (product) =>{
        const {products} = this.state;
        const index = products.indexOf(product);
        if(products[index].qty === 0){
            return;
        }
        products[index].qty -= 1;
        this.setState({
            products: products
        })
    }
    handleDeleteEvent = (id) =>{
        const {products} = this.state;
        const items = products.filter((item) => item.productId !== id);

        this.setState({ 
            products: items
        })
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
                            onIncreaseQty = {this.handleIncreaseEvent}
                            onDecreaseQty = {this.handleDecreaseEvent}
                            onDelete = {this.handleDeleteEvent}
                            />
                        )
                } 
                )}
            </div>
        )
    }
}

export default Cart;