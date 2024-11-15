import React, { useState } from 'react';
import './Reviews.css';
import Img1 from "../../Assets/Img1.jpg";
import Img2 from "../../Assets/Img2.jpg";
import Img3 from "../../Assets/Img3.jpg";
import Img4 from "../../Assets/Img4.jpg";
import Img5 from "../../Assets/Img5.jpg";
import Img6 from "../../Assets/Img6.jpg";
import Img7 from "../../Assets/Img7.jpg";
import Img8 from "../../Assets/Img8.jpg";
import Img9 from "../../Assets/Img9.jpg";
import Img10 from "../../Assets/Img10.jpg";

function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  let touchStartX = 0;

  const reviewsData = [
    {
      name: 'Pond',
      img: Img1,
      review: 'Vaultix is amazing! The interface is so user-friendly and the transfers are instant!',
      rating: 5
    },
    {
      name: 'Phuwin',
      img: Img2,
      review: 'Great service, very reliable. Highly recommend using Vaultix.',
      rating: 4
    },
    {
      name: 'Alice Johnson',
      img: Img3,
      review: 'I love the security features on Vaultix. Makes me feel safe using it.',
      rating: 5
    },
    {
      name: 'Michael Brown',
      img: Img4,
      review: 'The integration with Paystack is seamless and transactions are super quick!',
      rating: 5
    },
    {
      name: 'Lara Adebola',
      img: Img5,
      review: 'Vaultix has made my financial management so much easier. Highly recommend!',
      rating: 4
    },
    {
      name: 'Shifatu Aminat',
      img: Img6,
      review: 'Instant transfers and great customer service. Vaultix is top-notch!',
      rating: 5
    },
    {
      name: 'Jisoo',
      img: Img7,
      review: 'The user interface is sleek and easy to navigate. Love using Vaultix!',
      rating: 5
    },
    {
      name: 'James Anderson',
      img: Img8,
      review: 'Vaultix is reliable and secure. I trust them with all my transactions.',
      rating: 4
    },
    {
      name: 'Leems',
      img: Img9,
      review: 'Best service ever! Vaultix never disappoints.',
      rating: 5
    },
    {
      name: 'Matthew Walter',
      img: Img10,
      review: 'The security features are impressive. I feel very safe using Vaultix.',
      rating: 5
    }
    // Add more reviews here
  ];

  const handleSwipe = (direction) => {
    if (direction === 'left') {
      setCurrentIndex((prevIndex) =>
        prevIndex === reviewsData.length - 1 ? 0 : prevIndex + 1
      );
    } else if (direction === 'right') {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? reviewsData.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="reviews-carousel">
      <h2 className="reviews-title">Testimonials</h2>
      <div
        className="carousel-container"
        onTouchStart={(e) => {
          touchStartX = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const touchEndX = e.changedTouches[0].clientX;
          if (touchEndX < touchStartX) {
            handleSwipe('left');
          } else if (touchEndX > touchStartX) {
            handleSwipe('right');
          }
        }}
      >
        {reviewsData.map((review, index) => {
          let className = 'reviewCard';
          if (index === currentIndex) {
            className += ' active';
          } else if (
            index === currentIndex - 1 ||
            (currentIndex === 0 && index === reviewsData.length - 1)
          ) {
            className += ' left';
          } else if (
            index === currentIndex + 1 ||
            (currentIndex === reviewsData.length - 1 && index === 0)
          ) {
            className += ' right';
          }

          return (
            <div
              key={index}
              className={className}
            >
              <img src={review.img} alt={review.name} className="user-img" />
              <h3>{review.name}</h3>
              <p>{review.review}</p>
              <div className="rating">{'⭐'.repeat(review.rating)}</div>
            </div>
          );
        })}
      </div>
      <div className="arrows-container">
        <button className="arrow left-arrow" onClick={() => handleSwipe('right')}>
          &#8592;
        </button>
        <button className="arrow right-arrow" onClick={() => handleSwipe('left')}>
          &#8594;
        </button>
      </div>
    </div>
  );
}

export default Reviews;
