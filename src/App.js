import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import firebase from 'firebase';

class App extends React.Component {

  constructor () {
    super();
    this.state = {
      products: [],
      loading: true
    }
    this.db = firebase.firestore();
    // this.increaseQuantity = this.increaseQuantity.bind(this);
    // this.testing();
  }
  componentDidMount () {
    // firebase
    //   .firestore()
    //   .collection ('products')
    //   .get()
    //   .then((snapshot) => {
    //     console.log(snapshot);

    //     snapshot.docs.map ((doc) => {
    //       console.log(doc.data());
    //     })

    //     const products = snapshot.docs.map ((doc) => {
    //       const data = doc.data();
    //       data['id'] = doc.id;
    //       return data;
    //     })

    //     this.setState({
    //       products,
    //       loading:false 
    //     })

        
    //   })

    this.db
      .collection ('products')
      .onSnapshot ((snapshot) => {
        console.log(snapshot);

        snapshot.docs.map ((doc) => {
          console.log(doc.data());
        })

        const products = snapshot.docs.map ((doc) => {
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        })

        this.setState({
          products,
          loading:false 
        })
      })
  }


  handleIncreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;

    // this.setState({
    //   products
    // })

    const docRef = this.db.collection('products').doc(products[index].id);
    docRef.update({
      qty: products[index].qty+1
    })
    .then(() =>{
      console.log("updated succesfully");
    })
    .catch((error) => {
      console.log("error while updating",error);
    })
  }
  handleDecreaseQuantity = (product) => {
    console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    const docRef = this.db.collection('products').doc(products[index].id);
    docRef.update({
      qty: products[index].qty-1
    })
    .then(() =>{
      console.log("updated succesfully");
    })
    .catch((error) => {
      console.log("error while updating",error);
    })
  }
  handleDeleteProduct = (id) => {
    const { products } = this.state;

    const docRef = this.db.collection('products').doc(id);

    docRef.delete()
    .then(() =>{
      console.log("deleted succesfully");
    })
    .catch((error) => {
      console.log("error while deleting",error);
    })
  }

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      if(product.qty>0){
      cartTotal = cartTotal + product.qty * product.price
      }
      return '';
    })

    return cartTotal;
  }
  addItem = () =>{
    this.db
      .collection('products')
      .add ({
          title: "Tablet",
          qty: 3,
          price: 15000,
          img: ''
      }) 
      .then((docRef) => {
        console.log("added",docRef);
      })
      .catch((error) => {
        console.log("error",error);
      })
      
  }

  render () {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        <button onClick= {this.addItem}>Add Item</button>
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading</h1>}
        <div style={ {padding: 10, fontSize: 20} }>TOTAL: {this.getCartTotal()} </div>
      </div>
    );
  }
}

export default App;
