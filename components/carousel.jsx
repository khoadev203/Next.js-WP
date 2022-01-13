import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel(props) {
  let settings = {
    infinite: true,
    arrows: false,
    speed: 1200,
    autoplay: true
  };
  return (
    <div>
      <Slider {...settings} className="container slider-container">
        <div id="sliderCard01">
          <div className="slider-card-banner">
            <img src="img/01.jpg" alt="crypto"/>
          </div>
          <div className="slider-card-info">
            <div className="slider-card-title">
              <h2>Donec non rhoncus enim. Morbi finibus sagittis nulla, a auctor velit.</h2>
            </div>
            <div className="slider-card-excerpt">
              <p>Aliquam erat volutpat. Cras at nibh risus. Phasellus quis mauris eget metus pulvinar tempus quis
                ultricies sem.
                Suspendisse porttitor, est ut vulputate molestie, lectus diam convallis justo, vitae ultrices neque ante
                nec ex. </p>
            </div>
            <div className="slider-card-date">
              <span>2022-01-01</span>
            </div>
          </div>
        </div>
        <div id="sliderCard02">
          <div className="slider-card-banner">
            <img src="img/02.jpg" alt="crypto"/>
          </div>
          <div className="slider-card-info">
            <div className="slider-card-title">
              <h2>Nam tempor tristique odio ut faucibus. Nunc rutrum ante non purus vulputate euismod.</h2>
            </div>
            <div className="slider-card-excerpt">
              <p>Aenean sapien nulla, auctor non posuere eu, rhoncus sed orci. Sed maximus purus varius justo cursus, in
                tincidunt lacus porttitor. Vestibulum vel condimentum felis.
                Maecenas non varius neque. In in auctor risus.</p>
            </div>
            <div className="slider-card-date">
              <span>2022-01-01</span>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;