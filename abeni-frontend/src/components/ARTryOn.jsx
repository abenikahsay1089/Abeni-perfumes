import React from 'react';
import './ARTryOn.css';

export default function ARTryOn({ productId }) {
  const launchAR = () => {
    // This would integrate with your AR solution
    console.log(`Launching AR view for product ${productId}`);
    // Example: window.open(`/ar-viewer?product=${productId}`);
  };

  return (
    <button className="ar-try-on" onClick={launchAR}>
      <span className="ar-icon">👁️</span> Try in AR
      <div className="ar-tooltip">
        See how this scent would look on your vanity using augmented reality
      </div>
    </button>
  );
}