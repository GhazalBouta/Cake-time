import { useContext, useState, useEffect } from "react";
import "../CSS/CartItems.css";
import { ShopContext } from "../Context/ShopContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Order from "./Order.jsx";
import axiosInstance from "../Context/axiosInstance.jsx";

const CartItems = () => {
  const { getTotalCartAmount, cartItems, removeFromCart, addToCart, updateCartItemCount } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Axios error:', error);
        setError('Error fetching products: ' + (error.response?.data?.message || error.message));
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
    // Handle scroll lock when modal is open
    useEffect(() => {
      if (isModalOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
  
      // Cleanup when component unmounts
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [isModalOpen]);

  const openModal = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  const cartProductIds = Object.keys(cartItems).filter(id => cartItems[id] > 0);
  const cartProducts = products.filter(product => cartProductIds.includes(product._id));

  const orderItems = cartProducts.map(product => ({
    product: product._id,
    quantity: cartItems[product._id],
    price: product.price
  }));

  const totalAmount = parseFloat(getTotalCartAmount().toFixed(2));

  if (cartProducts.length === 0) {
    return (
      <div className="empty-wishlist">
        <p>Your shopping cart is empty</p>
        <Link to="/shop/all-products"><button>Go to Shop</button></Link>
      </div>
    );
  }

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
      </div>
      <hr />
      {cartProducts.map((product) => (
        <div key={product._id}>
          <div className="cartitems-format">
            <Link to={`/products/${product._id}`}>
              <img src={product.images && product.images.product && product.images.product[0] ? product.images.product[0].url : ''} alt="" className="carticon-product-icon"/>
            </Link>
            <p>{product.name}</p>
            <p>${product.price.toFixed(2)}</p>
            <div className="cartitem-quantity-control">
              <FontAwesomeIcon 
                icon={faMinus} 
                onClick={() => removeFromCart(product._id)}
                className="quantity-icon"
              />
              <input 
                type="number"
                className="cartitem-quantity"
                value={cartItems[product._id]}
                onChange={(event) => updateCartItemCount(Number(event.target.value), product._id)}
              />
              <FontAwesomeIcon 
                icon={faPlus} 
                onClick={() => addToCart(product._id)}
                className="quantity-icon"
              />
            </div>
            <p>${(product.price * cartItems[product._id]).toFixed(2)}</p>
          </div>
          <hr />
        </div>
      ))}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <div className="fsp">
            <p>Free shipping for orders above $500</p>
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${totalAmount}</h3>
            </div>
          </div>
          <button onClick={openModal}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
      
      {isModalOpen && (
        <div className="modal-cart">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <Order 
              orderItems={orderItems} 
              totalPrice={totalAmount}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;