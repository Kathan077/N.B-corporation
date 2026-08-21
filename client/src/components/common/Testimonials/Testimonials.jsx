import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Quote, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import './Testimonials.css';

const TestimonialCard = ({ client, review, author, index, id }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="testimonial-card"
    >
      <div className="testimonial-card-inner">
        <div className="card-top-accent" />
        <div className="testimonial-id">TRK_ID_{id}</div>

        <div className="quote-wrapper">
          <Quote className="quote-icon" size={24} />
          <p className="testimonial-review">{review}</p>
        </div>

        <div className="testimonial-footer">
          <div className="client-meta">
            <h4 className="client-author">{author}</h4>
            <span className="client-review-tag">Client Review</span>
          </div>
          <div className="author-bar" />
          <div className="client-badge">
            <div className="badge-logo-placeholder">{client ? client.charAt(0) : 'C'}</div>
            <span className="client-name">{client}</span>
          </div>
        </div>

        <div className="laser-scanner" />
        <div className="card-glow" />
      </div>
    </motion.div>
  );
};

const defaultTestimonials = [
  {
    id: 'STP-01',
    client: 'STP Limited',
    author: 'Sarita Koul',
    review:
      'Our company has been in business with Tack Innovations for over 1 year and I can attest to the level of service quality that they offer at an affordable price. We firmly believe your company benefits from doing business — you are very important and integral to our own success.',
  },
  {
    id: 'CEL-02',
    client: 'Central Electronics Limited',
    author: 'Sarita Koul',
    review:
      'Central Electronics Limited, Ghaziabad, has been procuring supplies for at least 6 years, and we can attest to the commendable level of service quality they provide at an affordable price.',
  },
  {
    id: 'FAL-03',
    client: 'Falcon Intl',
    author: 'Gaurav Singh',
    review:
      'Your success shines through in providing material and product support for silicone, quick-paced arrangement of materials with technical data and MSDS, and prompt support in handling pricing issues when they arise.',
  },
  {
    id: 'IFB-04',
    client: 'IFB',
    author: 'Author Name',
    review:
      'Dealer for various automotive products. We anticipate a long-term relationship with support in technical expertise and quality materials. We look forward to a continued partnership and wish you the best in the future.',
  },
];

const Testimonials = ({ content }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === 'left' ? scrollLeft - clientWidth * 0.85 : scrollLeft + clientWidth * 0.85;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const eyebrow = content?.eyebrow || 'Testimonials';
  const heading = content?.heading || 'Proud Moments';
  const highlight = content?.highlight || 'Happy Clients';
  const watermark = content?.watermark || 'LEGACY';
  const testimonials = content?.items && content.items.length > 0 
    ? content.items.filter(it => it.isActive !== false) 
    : defaultTestimonials;

  return (
    <section className="testimonials-section">
      {/* Dot grid background */}
      <div className="t-bg-grid" aria-hidden="true" />

      {/* Watermark */}
      <div className="t-watermark" aria-hidden="true">{watermark}</div>

      <div className="t-container">
        {/* Header */}
        <div className="t-header">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="t-eyebrow"
          >
            <div className="t-eyebrow-line" />
            <span className="t-eyebrow-text">{eyebrow}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="t-heading"
          >
            {heading} <br />
            <em className="t-heading-accent">{highlight}</em>
          </motion.h2>
        </div>

        {/* Slider */}
        <div className="t-slider-wrapper">
          {/* Desktop nav */}
          <button
            onClick={() => scroll('left')}
            className="slider-nav slider-nav--left"
            aria-label="Scroll left"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="slider-nav slider-nav--right"
            aria-label="Scroll right"
          >
            <ChevronRight size={22} />
          </button>

          <div ref={scrollRef} className="t-slider">
            {testimonials.map((t, i) => (
              <div key={t.id || i} className="t-slide">
                <TestimonialCard {...t} index={i} />
              </div>
            ))}
          </div>

          {/* Mobile nav */}
          <div className="t-mobile-nav">
            <button onClick={() => scroll('left')} className="slider-nav slider-nav--mobile" aria-label="Scroll left">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="slider-nav slider-nav--mobile" aria-label="Scroll right">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;