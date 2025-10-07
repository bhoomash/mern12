import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // NOTE: no need for an async function here as we are not awaiting the
  // resolution of a Promise
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="cart-screen">
      <div className="cart-header mb-4">
        <h1 className="cart-title">Shopping Cart</h1>
        <p className="cart-subtitle">
          {cartItems.length > 0 
            ? `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart`
            : 'Your cart is empty'
          }
        </p>
      </div>

      <Row className="g-4">
        <Col lg={8}>
          <div className="cart-items-section">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-content">
                  <div className="empty-cart-icon">🛒</div>
                  <h3 className="empty-cart-title">Your cart is empty</h3>
                  <p className="empty-cart-text">
                    Looks like you haven't added anything to your cart yet. 
                    Start shopping to fill it up!
                  </p>
                  <Link to='/' className="btn btn-primary continue-shopping-btn">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            ) : (
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div key={item._id} className="cart-item">
                    <Row className="align-items-center">
                      <Col md={3} sm={12}>
                        <div className="item-image-section">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fluid 
                            rounded 
                            className="cart-item-image"
                          />
                        </div>
                      </Col>
                      <Col md={4} sm={12}>
                        <div className="item-details-section">
                          <Link 
                            to={`/product/${item._id}`} 
                            className="item-name-link"
                          >
                            <h5 className="item-name">{item.name}</h5>
                          </Link>
                          <div className="item-meta">
                            <span className="item-brand">{item.brand}</span>
                            <span className="item-separator">•</span>
                            <span className="item-category">{item.category}</span>
                          </div>
                        </div>
                      </Col>
                      <Col md={2} sm={4}>
                        <div className="item-price-section">
                          <span className="item-price">₹{item.price}</span>
                        </div>
                      </Col>
                      <Col md={2} sm={4}>
                        <div className="item-quantity-section">
                          <div className="quantity-controls">
                            <button
                              className="quantity-btn minus-btn"
                              onClick={() => 
                                item.qty > 1 && addToCartHandler(item, item.qty - 1)
                              }
                              disabled={item.qty <= 1}
                            >
                              <FaMinus />
                            </button>
                            <span className="quantity-display">{item.qty}</span>
                            <button
                              className="quantity-btn plus-btn"
                              onClick={() => 
                                item.qty < item.countInStock && addToCartHandler(item, item.qty + 1)
                              }
                              disabled={item.qty >= item.countInStock}
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                      </Col>
                      <Col md={1} sm={4}>
                        <div className="item-actions-section">
                          <Button
                            type='button'
                            variant='outline-danger'
                            size="sm"
                            onClick={() => removeFromCartHandler(item._id)}
                            className="remove-item-btn"
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Col>

        <Col lg={4}>
          <div className="cart-summary-section">
            <Card className="cart-summary-card shadow-boodmo">
              <Card.Header className="summary-header">
                <h4 className="summary-title">Order Summary</h4>
              </Card.Header>
              <Card.Body className="summary-body">
                <div className="summary-row">
                  <span className="summary-label">
                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
                  </span>
                  <span className="summary-value">
                    ${cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>
                
                <div className="summary-row">
                  <span className="summary-label">Shipping</span>
                  <span className="summary-value text-success">FREE</span>
                </div>
                
                <hr className="summary-divider" />
                
                <div className="summary-row total-row">
                  <span className="summary-label total-label">Total</span>
                  <span className="summary-value total-value">
                    ₹{cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>
                
                <Button
                  type='button'
                  className='checkout-btn w-100'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  {cartItems.length === 0 ? 'Cart is Empty' : 'Proceed To Checkout'}
                </Button>
                
                {cartItems.length > 0 && (
                  <div className="continue-shopping">
                    <Link to='/' className="continue-shopping-link">
                      ← Continue Shopping
                    </Link>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
