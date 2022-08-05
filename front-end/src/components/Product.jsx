import React from 'react';
import PropTypes from 'prop-types';

export default function Product(props){
    const{id,name,price,url_image} = props;
    return(
        <div>
            <aside>{price}</aside>
            <body>
                <img src={url_image} alt={name}/>
                <h5>{name}</h5>
            </body>
            <footer>
                <button type='button' onClick={()=>{decreaseQuantity(id)}}>-</button>
                <strong>{Quantity(id)}</strong>
                <button type='button' onClick={()=>{increaseQuantity(id)}}>+</button>

            </footer>
        </div>
    )
}

Product.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    url_image: PropTypes.string,
}.isRequired;