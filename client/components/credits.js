import React from 'react';

import '../css/_credits.scss';

const Credits = () => {
  return (
    <div className="credits-wrapper">
      <h1>About Us:</h1>
        <p>We're a rag-tag team of programmers fighting against all odds to bring you a legally permissable version of an existing strategy board game of diplomacy, conflict and conquest. Special thanks to <a href="https://www.fullstackacademy.com/">Fullstack Academy</a>.</p>

      <div className="section">
        <div className="section-header">
        <h2>Zachary D Friedman </h2>
          <h3>
            <a href="https://zacharydfriedman.herokuapp.com/">Portfolio </a>|
            <a href="https://github.com/ZacharyDudley"> GitHub </a>|
            <a href="https://www.linkedin.com/in/zacharydfriedman/"> LinkedIn</a>
          </h3>
        </div>
          <p>Zach is a programmer.</p>
      </div>

      <div className="section">
      <div className="section-header">
        <h2>Damian Michniak</h2>
          <h3>
            <a href="">Portfolio </a>|
            <a href="https://github.com/Cosmet"> GitHub </a>|
            <a href="https://www.linkedin.com/in/damian-michniak/"> LinkedIn</a>
          </h3>
        </div>
          <p>Some words about Damian</p>
      </div>

      <div className="section">
      <div className="section-header">
        <h2>BreAnna Silva</h2>
          <h3>
            <a href="">Portfolio </a>|
            <a href="https://github.com/bfsilva713"> GitHub </a>|
            <a href="https://www.linkedin.com/in/breannafsilva/"> LinkedIn</a>
          </h3>
        </div>
          <p>Some words about BreAnna</p>
      </div>

      <div className="section">
      <div className="section-header">
        <h2>Christian Sadi</h2>
          <h3>
            <a href="">Portfolio </a>|
            <a href="https://github.com/bizdevchristian"> GitHub </a>|
            <a href="https://www.linkedin.com/in/christiansadi/"> LinkedIn</a>
          </h3>
          </div>
          <p>Some words about Christian</p>
      </div>
    </div>
  )
}

export default Credits
