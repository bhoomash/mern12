import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-content">
        <Container>
          <Row className="g-4">
            <Col lg={4} md={6}>
              <div className="footer-section">
                <h5 className="footer-title">Auto Parts</h5>
                <p className="footer-description">
                  Your trusted partner for premium products. We offer quality, reliability, 
                  and exceptional customer service for all your shopping needs.
                </p>
              </div>
            </Col>
            <Col lg={2} md={6}>
              <div className="footer-section">
                <h6 className="footer-subtitle">Quick Links</h6>
                <ul className="footer-links">
                  <li><a href="/">Home</a></li>
                  <li><a href="/cart">Cart</a></li>
                  <li><a href="/login">Sign In</a></li>
                </ul>
              </div>
            </Col>
            <Col lg={2} md={6}>
              <div className="footer-section">
                <h6 className="footer-subtitle">Categories</h6>
                <ul className="footer-links">
                  <li><a href="/">Electronics</a></li>
                  <li><a href="/">Fashion</a></li>
                  <li><a href="/">Home & Garden</a></li>
                </ul>
              </div>
            </Col>
            <Col lg={2} md={6}>
              <div className="footer-section">
                <h6 className="footer-subtitle">Support</h6>
                <ul className="footer-links">
                  <li><a href="/">Help Center</a></li>
                  <li><a href="/">Returns</a></li>
                  <li><a href="/">Contact Us</a></li>
                </ul>
              </div>
            </Col>
            <Col lg={2} md={12}>
              <div className="footer-section">
                <h6 className="footer-subtitle">Follow Us</h6>
                <div className="social-links">
                  <a href="https://facebook.com" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF className="social-icon" />
                    <span className="social-text">Facebook</span>
                  </a>
                  <a href="https://twitter.com" className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="social-icon" />
                    <span className="social-text">Twitter</span>
                  </a>
                  <a href="https://instagram.com" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="social-icon" />
                    <span className="social-text">Instagram</span>
                  </a>
                  <a href="https://linkedin.com" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn className="social-icon" />
                    <span className="social-text">LinkedIn</span>
                  </a>
                  <a href="https://youtube.com" className="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                    <FaYoutube className="social-icon" />
                    <span className="social-text">YouTube</span>
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer-bottom">
        <Container>
          <Row>
            <Col className='text-center'>
              <p className="copyright-text">
                &copy; {currentYear} Auto Parts. All rights reserved. Built with ❤️ for automotive enthusiasts.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      
    </footer>
  );
};
export default Footer;
