import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ ...product, qty: 1 }));
    navigate('/cart');
  };

  const addToWishlistHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Add wishlist functionality here
    console.log('Added to wishlist:', product.name);
  };

  // Calculate discount percentage if there's a higher original price
  const originalPrice = product.price * 1.25; // Simulating 25% discount
  const discountPercentage = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <Card className='product-card my-3 shadow-boodmo fade-in-up'>
      <div className="product-image-container">
        <Link to={`/product/${product._id}`} className='product-image-link'>
          <Card.Img src={product.image} variant='top' className="product-image" />
        </Link>
        
        {/* Heart Icon for Wishlist */}
        <button 
          className="wishlist-btn"
          onClick={addToWishlistHandler}
          aria-label="Add to wishlist"
        >
          <FaHeart />
        </button>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="discount-badge">
            -{discountPercentage}%
          </div>
        )}
      </div>

      <Card.Body className="product-body">
        {/* Brand Name */}
        <div className="product-brand">
          {product.brand || 'AUTO PARTS'}
        </div>

        <Link to={`/product/${product._id}`} className='text-decoration-none'>
          <Card.Title as='div' className='product-title'>
            {product.name}
          </Card.Title>
        </Link>

        <Card.Text as='div' className="product-rating">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        {/* Pricing Section */}
        <div className="product-pricing">
          {discountPercentage > 0 && (
            <span className="original-price">Rs. {originalPrice.toFixed(2)}</span>
          )}
          <span className="current-price">Rs. {product.price}</span>
        </div>

        {/* Add to Cart Button */}
        <Button 
          className="add-to-cart-btn w-100"
          variant="outline-dark"
          onClick={addToCartHandler}
          disabled={product.countInStock === 0}
        >
          <FaShoppingCart className="me-2" />
          {product.countInStock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
