import React from 'react';
import { Link } from 'react-router-dom';
import './fruit.css';
import '../css/style.css';

const Checkout = (props) => {
    return (
        <div>
            {props.cart.map((item) => {
                return (
                    <div key={item.id} className="card fruit">
                        <img className="card-img-top img" src={item.image} alt={item.name} />
                        <div className="card-body">
                            <p className="card-text caption">Quantity:<br />
                                <i className="fa fa-minus" aria-hidden="true" onClick={() => props.decreaseQuantity(item.id)}></i>
                                {item.quantity}
                                <i className="fa fa-plus" aria-hidden="true" onClick={() => props.increaseQuantity(item.id)}></i>
                            </p>
                        </div>
                    </div>
                );
            })}
            <p>Total: ${props.total.toFixed(2)}</p>

            <Link to={'/confirmation'}>
                <button type="button" className="btn btn-primary btn-checkout" onClick={props.clearCart}>
                    Order Fruit Now
                </button>
            </Link>
        </div>
    );
}

{/* <div className="row">
<div className="col-lg-2">
    <div className="input-group">
        <input type="text" className="form-control" placeholder="Name" aria-label="Name" onChange={props.handleChange} value={props.text} />
    </div>
</div>
</div> */}

//disabled={props.isDisabled || props.total === 0 ? "disabled" : false}
export default Checkout;