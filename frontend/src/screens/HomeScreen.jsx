import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <div className="home-screen">
      {!keyword ? (
        <section className="hero-section mb-5">
          <ProductCarousel />
        </section>
      ) : (
        <div className="search-header mb-4">
          <Link to='/' className='btn btn-outline-primary'>
            ← Go Back
          </Link>
          <h2 className="search-title mt-3">Search Results for "{keyword}"</h2>
        </div>
      )}
      {isLoading ? (
        <div className="loading-container text-center py-5">
          <Loader />
        </div>
      ) : error ? (
        <div className="error-container">
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        </div>
      ) : (
        <section className="products-section">
          <Meta />
          <div className="section-header mb-4">
            <h1 className="section-title">
              {keyword ? `Search Results` : 'Latest Products'}
            </h1>
            <p className="section-subtitle text-muted">
              {keyword 
                ? `Found ${data.products.length} products matching "${keyword}"` 
                : 'Discover our featured collection of premium products'
              }
            </p>
          </div>
          
          <div className="products-grid">
            <Row className="g-4">
              {data.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </div>
          
          {data.pages > 1 && (
            <div className="pagination-container mt-5 d-flex justify-content-center">
              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword ? keyword : ''}
              />
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default HomeScreen;
