import React, { Component } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import Homepage from './components/homePage'
import Products from './components/Products'
import About from './components/About'
import Fruit from './components/Fruit'
import Checkout from './components/Checkout'
import '../src/css/style.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

//import './css/font-awesome/css/font-awesome.min.css'
import tropicalFruits from './tropical-fruits.json';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      cartCount: 0,
      total: 0.0,
      text: '',
      displayName: '',
      isDisabled: true,
      search:'',
      fruits: tropicalFruits
    };
  }

  checkId(cart, id) {
    return cart.some((item) => {
      return item.id === id;
    })
  }

  addToCart(item) {
    const newItem = Object.assign({}, item);
    const cart = this.state.cart.slice();
    let price = 0.0;

    if (this.checkId(cart, newItem.id)) {
      let index = cart.findIndex((x => x.id === newItem.id));
      price = cart[index].price;
      cart[index].quantity += 1;
    } else {
      cart.push(newItem);
      let index = cart.findIndex((x => x.id === newItem.id));
      price = cart[index].price;
      cart[index].quantity += 1;
    }

    this.setState((prevState) => ({
      cart: cart,
      cartCount: prevState.cartCount + 1,
      total: prevState.total + price
    }));
  }

  decreaseQuantity(id) {
    const cart = this.state.cart.slice();

    let index = cart.findIndex((x => x.id === id));
    let price = cart[index].price;

    cart[index].quantity -= 1;

    if (cart[index].quantity === 0) cart.splice(index, 1);

    this.setState((prevState) => ({
      cart: cart,
      cartCount: prevState.cartCount - 1,
      total: prevState.total - price
    }));
  }

  increaseQuantity(id) {
    const cart = this.state.cart.slice();

    let index = cart.findIndex((x => x.id === id));
    let price = cart[index].price;

    cart[index].quantity += 1;

    this.setState((prevState) => ({
      cart: cart,
      cartCount: prevState.cartCount + 1,
      total: prevState.total + price
    }));
  }

  handleChange(e) {
    if (e.target.value !== '')
      this.setState({ text: e.target.value, displayName: e.target.value, isDisabled: false });
    else
      this.setState({ text: '', isDisabled: true })
  }

  clearCart() {
    this.setState({
      cart: [],
      cartCount: 0,
      total: 0.0,
      text: '',
      isDisabled: true,
      search:''
    });
  }

  updateSearch (event){
    this.setState({search: event.target.value.substr(0,20)});
  }

  render() {

    let tropicalFruits = this.state.fruits.filter(
      (fruit) => {
        return fruit.name.indexOf(this.state.search) !== -1;
      }
    )

    return (

      <Router>
        <div className="App container-fluid">
          <Header />

          <Route exact path='/Products' component={Products} />
          <Route exact={true} path="/Products" render={() => (
            <div>
              <div>
                <form>
                  <input type="text" icon="search" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
                </form>
              </div>
              <div>
                <Link to={'/checkout'}>
                  <button className="btn btn-dark btn-checkout">
                    Go to Checkout <span className="badge badge-secondary">{this.state.cartCount}</span>
                  </button>
                </Link>
              </div>
              {tropicalFruits.map((fruit) => {
                return (
                  <Fruit
                    key={fruit.id}
                    image={fruit.image}
                    name={fruit.name}
                    price={fruit.price}
                    addToCart={() => this.addToCart(fruit)}
                  />
                );
              })}
            </div>
          )} />

          <Route path="/checkout" render={() =>
            <Checkout
              cart={this.state.cart}
              total={this.state.total}
              text={this.state.text}
              isDisabled={this.state.isDisabled}
              handleChange={(event) => this.handleChange(event)}
              decreaseQuantity={(id) => this.decreaseQuantity(id)}
              increaseQuantity={(id) => this.increaseQuantity(id)}
              clearCart={() => this.clearCart()}
            />}
          />
          <Route path="/confirmation" render={() => <ThankYou personName={this.state.displayName} />} />

          <Route exact path='/' component={Homepage} />
          <Route exact path='/About' component={About} />

          <Footer />
        </div>
      </Router>
    );
  }
}

const ThankYou = (props) => {
  return (
    <div className="h3 alert alert-success" role="alert">
      Thank you {props.personName}! Your order was successfully submitted.
    </div>
  );
}

export default App;