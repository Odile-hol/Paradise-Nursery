import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../features/CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const plantsArray = [
        {
            category: "Plantes Aromatiques",
            plants: [
                { name: "Lavande", image: "https://images.unsplash.com/photo-1591017403986-ed2298d73305", description: "Calmante et odorante.", cost: "$15" },
                { name: "Menthe", image: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a", description: "Parfaite pour les mojitos.", cost: "$10" }
            ]
        },
        {
            category: "Plantes Médicinales",
            plants: [
                { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921", description: "Apaise les brûlures.", cost: "$20" },
                { name: "Mélisse", image: "https://images.unsplash.com/photo-1522881192131-9a74474930bc", description: "Réduit le stress.", cost: "$12" }
            ]
        },
        {
            category: "Plantes d'Ombre",
            plants: [
                { name: "Fougère", image: "https://images.unsplash.com/photo-1509223197158-99be661a520c", description: "Aime l'humidité.", cost: "$18" },
                { name: "Sansevieria", image: "https://images.unsplash.com/photo-1592150621344-22d52840ca39", description: "Presque indestructible.", cost: "$25" }
            ]
        }
    ];

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    return (
        <div className="main-container">
            <nav className="navbar">
                <div className="navbar-logo" onClick={() => setShowCart(false)}>
                    <img src="https://cdn-icons-png.flaticon.com/512/628/628283.png" alt="logo" />
                    <div className="logo-text">
                        <h3>Paradise Nursery</h3>
                        <i>Où le vert rencontre la sérénité</i>
                    </div>
                </div>
                <div className="navbar-links">
                    <button className="nav-link" onClick={() => setShowCart(false)}>Plantes</button>
                    <button className="nav-link cart-link" onClick={() => setShowCart(true)}>
                        <span className="cart-icon">🛒</span>
                        <span className="cart-badge">{totalQuantity}</span>
                    </button>
                </div>
            </nav>

            {!showCart ? (
                <div className="product-listing">
                    {plantsArray.map((category, index) => (
                        <div key={index} className="category-container">
                            <h2 className="category-title">{category.category}</h2>
                            <div className="plants-grid">
                                {category.plants.map((plant, pIndex) => (
                                    <div className="product-card" key={pIndex}>
                                        <div className="product-image-container">
                                            <img className="product-image" src={plant.image} alt={plant.name} />
                                        </div>
                                        <h3 className="product-name">{plant.name}</h3>
                                        <p className="product-description">{plant.description}</p>
                                        <p className="product-cost">{plant.cost}</p>
                                        <button 
                                            className={`add-to-cart-btn ${cart.some(item => item.name === plant.name) ? 'added' : ''}`}
                                            disabled={cart.some(item => item.name === plant.name)}
                                            onClick={() => handleAddToCart(plant)}>
                                            {cart.some(item => item.name === plant.name) ? "Ajouté" : "Ajouter au panier"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={() => setShowCart(false)} />
            )}
        </div>
    );
}

export default ProductList;