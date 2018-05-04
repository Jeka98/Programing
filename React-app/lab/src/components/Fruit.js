import React from 'react';
import './fruit.css';
import '../css/style.css';

const Fruit = (props) => {
    return (
        <div className="card fruit">
            <img className="card-img-top img" src={props.image} alt={props.name} />
            <div className="card-body">
                <p className="card-text caption">{props.name} - ${props.price}</p>
                <button className="btn btn-dark" onClick={props.addToCart}>Add to Cart</button>
            </div>
        </div>
    );
}

export default Fruit;