import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>
            <b>Contact</b>
          </h4>
          <p>Email: &nbsp;&nbsp; abc@example.com</p>
          <p>Phone: &nbsp;+123 456 7890</p>
        </div>
        <div className="footer-section social-media">
          <h4>
            <b>Follow Us</b>
          </h4>
          <ul>
            <li>
              <Link
                to="https://linkedin.com/in/arooj-ashfaq-400538318"
                target="_blank"
              >
                LinkedIn
              </Link>
            </li>
            <li>
              <Link to="https://github.com/Arooj-Ashfaq" target="_blank">
                GitHub
              </Link>
            </li>
            <li>
              <Link to="https://dribbble.com/Play_with_designs" target="_blank">
                Dribbble
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Your Website. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
