import React from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import FeaturedCollections from '../components/FeaturedCollections';
import CulturalBanner from '../components/CulturalBanner';
import SustainabilityDashboard from '../components/SustainabilityDashboard';
import Testimonials from '../components/Testimonials';
import PerfumeFinder from '../components/PerfumeFinder';
import NewsletterSignup from '../components/NewsletterSignup';

export default function Home() {
  return (
    <div className="home-page">
      {/* Simple Search Bar at Top */}
      <div className="home-top-search">
        <SearchBar isHomePage={true} />
      </div>
      
      <Hero />
      <FeaturedCollections />
      <CulturalBanner />
      <SustainabilityDashboard />
      <Testimonials />
      <PerfumeFinder />
      <NewsletterSignup />
    </div>
  );
}