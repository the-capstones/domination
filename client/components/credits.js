import React from 'react';

import '../css/_credits.scss';

const Credits = () => {
  return (
    <div className="credits-wrapper">
      <div className="about-us">
        <h1>About Us</h1>
        <p>We're a rag-tag team of programmers fighting against all odds to bring you a legally permissable version of an existing strategy board game of diplomacy, conflict and conquest. Special thanks to <a href="https://www.fullstackacademy.com/">Fullstack Academy</a>.</p>
      </div>
      <div className="credits-section-wrapper">
        <div className="section">
          <div className="section-header">
            <img src="assets/avatar/king.png" />
            <div className="bg-green">

              <h2>Zachary D Friedman </h2>
              <h3>
                <a href="https://zacharydfriedman.herokuapp.com/">
                  <i className="fa fa-globe" aria-hidden="true"></i>
                </a>
                &bull;
                <a href="https://github.com/ZacharyDudley">
                  <i className="fa fa-github-alt" aria-hidden="true"></i>
                </a>
                &bull;
                <a href="https://www.linkedin.com/in/zacharydfriedman/">
                  <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                </a>
              </h3>
            </div>
          </div>
          <p>Zach is a programmer.</p>
        </div>

        <div className="section">
          <div className="section-header">
            <img src="assets/avatar/king.png" />
            <div className="bg-yellow">
              <h2>Damian Michniak</h2>
              <h3>
                <a href="">
                  <i className="fa fa-globe" aria-hidden="true"></i>
                </a>
                &bull;
                <a href="https://github.com/Cosmet">
                <i className="fa fa-github-alt" aria-hidden="true"></i>
                </a>
                &bull;
                <a href="https://www.linkedin.com/in/damian-michniak/">
                  <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                </a>
              </h3>
            </div>
          </div>
          <p>Some words about Damian</p>
        </div>

        <div className="section">
          <div className="section-header">
            <img src="assets/avatar/king.png" />
            <div className="bg-blue">

              <h2>BreAnna Silva</h2>
              <h3>
                <a href="">
                  <i className="fa fa-globe" aria-hidden="true"></i>
                </a>
                &bull;
                <a href="https://github.com/bfsilva713">
                  <i className="fa fa-github-alt" aria-hidden="true"></i>
                </a>
                &bull;
                <a href="https://www.linkedin.com/in/breannafsilva/">
                  <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                </a>
              </h3>
            </div>
          </div>
          <p>BreAnna made this with love</p>
        </div>

        <div className="section">
          <div className="section-header">
            <img src="assets/avatar/king.png" />
            <div className="bg-red">

              <h2>Christian Sadi</h2>
              <h3>
                <a href="">
                  <i className="fa fa-globe" aria-hidden="true"></i>
                </a>
                &bull;
                <a href="https://github.com/bizdevchristian">
                  <i className="fa fa-github-alt" aria-hidden="true"></i>
                </a>
                &bull;
                <a href="https://www.linkedin.com/in/christiansadi/">
                  <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                </a>
              </h3>
            </div>
          </div>
          <p>Some words about Christian</p>
        </div>
      </div>

    </div>
  )
}

export default Credits
