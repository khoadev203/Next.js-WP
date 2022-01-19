import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel(props) {
  const {featuredPosts} = props
  let settings = {
    infinite: true,
    arrows: false,
    speed: 1200,
    autoplay: true
  };
  return (
    <div>
      <Slider {...settings} className="container slider-container">
        {
          featuredPosts ? featuredPosts.map((post) => {
            return (
              <div key={`sliderCard${post.id}`} className="sliderCard">
                <div className="slider-card-banner">
                  {
                    post.featured_media ?
                      <img src={post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url} />
                      :
                      <img src="img/post-banner-01.jpg"/>
                  }
                </div>
                <div className="slider-card-info">
                  <div className="slider-card-title">
                    <h2>{post.title.rendered}</h2>
                  </div>
                  <div className="slider-card-excerpt" dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}>

                  </div>
                  <div className="slider-card-date">
                    <span>{post.date.split('T')[0]}</span>
                  </div>
                </div>
              </div>
            )
          }) : ''
        }
      </Slider>
    </div>
  );
}

export default Carousel;