import React from 'react'

export default function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg my-2 nav-bar">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"> <img src="/logo-trendy.jpg" className='logo-img' alt="" /></a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-container">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"><img src="/payment-icon.jpg" alt="" /></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"> <img src="/phone-icon.png" className='phone-icon' alt="" /> +92-322-0011972</a>
            </li>
          </ul>
          <form className="d-flex search-section" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>

    <div id="carouselExampleControls" className="carousel slide slider" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/Business-card-banner.jpg" className="d-block w-100" alt="First slide" />
        </div>
        <div className="carousel-item">
          <img src="/Business-card-banner.jpg" className="d-block w-100" alt="Second slide" />
        </div>
        <div className="carousel-item">
          <img src="/Business-card-banner.jpg" className="d-block w-100" alt="Third slide" />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

    </div>
  )
}
