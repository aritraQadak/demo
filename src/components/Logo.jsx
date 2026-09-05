import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.jpg';

export default function Logo({
  className = '',
  imgClassName = 'h-12 sm:h-14 w-auto',
  linkTo = '/',
  clickable = true
}) {
  const content = (
    <img
      src={logoImg}
      alt="Karigar"
      className={`object-contain transition-transform duration-200 ${imgClassName}`}
      style={{ objectFit: 'contain', width: 'auto' }}
    />
  );

  if (!clickable) {
    return <div className={`inline-flex items-center ${className}`}>{content}</div>;
  }

  return (
    <Link to={linkTo} className={`inline-flex items-center group ${className}`}>
      {content}
    </Link>
  );
}
