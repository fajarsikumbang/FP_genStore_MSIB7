import "./Footer.css";

import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Gen Store. All rights reserved.</p>
        <p>
          Follow us on:
          <a
            href="https://github.com/fajarsikumbang"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Github
          </a>{" "}
          |
          <a
            href="https://www.linkedin.com/in/fajar-maulana-a843ab261"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Linkedin
          </a>{" "}
          |
          <a
            href="https://instagram.com/itsmetaaata_"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Instagram
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
