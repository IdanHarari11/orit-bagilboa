'use client';

import Container from './Container';

const Section = ({
  children,
  id,
  title,
  subtitle,
  className = '',
  bgColor = 'bg-white',
}) => (
  <section
    id={id}
    className={`${bgColor} section-padding section-reveal ${className}`}
  >
    <Container>
      {title && <h2 className="section-title">{title}</h2>}
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      {children}
    </Container>
  </section>
);

export default Section;
