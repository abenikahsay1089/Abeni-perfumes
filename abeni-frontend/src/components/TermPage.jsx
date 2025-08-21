// src/components/TermPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function TermPage({ title, children }) {
  return (
    <div className="term-page">
      <div className="term-header">
        <h1 className="term-title">{title}</h1>
      </div>
      
      <div className="term-content">
        {children}
      </div>
      
      <Link to="/about" className="back-link">
        <FiArrowLeft /> Back to About
      </Link>
    </div>
  );
}