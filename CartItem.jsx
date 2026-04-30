import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../features/CartSlice';
import './ProductList.css'; // On réutilise les styles globaux ou CartItem.css

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + (parseFloat(item.cost.substring(1)) * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="cart-container" style={{padding: '20px', textAlign: 'center'}}>
      <h2>Total Panier: ${calculateTotalAmount()}</h2>
      <div className="cart-items-list">
        {cart.map(item => (
          <div key={item.name} className="product-card" style={{margin: '10px auto', maxWidth: '500px', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
            <img src={item.image} style={{width: '80px', borderRadius: '5px'}} alt={item.name} />
            <div>
              <h4>{item.name}</h4>
              <p>{item.cost}</p>
              <div>
                <button onClick={() => dispatch(updateQuantity({name: item.name, quantity: Math.max(1, item.quantity - 1)}))}>-</button>
                <span style={{margin: '0 10px'}}>{item.quantity}</span>
                <button onClick={() => dispatch(updateQuantity({name: item.name, quantity: item.quantity + 1}))}>+</button>
              </div>
            </div>
            <button onClick={() => dispatch(removeItem(item.name))} style={{backgroundColor: 'red', color: 'white', border: 'none', padding: '5px'}}>Supprimer</button>
          </div>
        ))}
      </div>
      <button className="add-to-cart-btn" style={{marginTop: '20px'}} onClick={onContinueShopping}>Continuer mes achats</button>
    </div>
  );
};

export default CartItem;