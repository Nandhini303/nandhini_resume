import React from 'react';
import { useContent } from '../context/ContentProvider';
import logoImg from '../assets/logo.jpg';

export default function Logo({ size = 30, className = '', title }) {
  const { settings } = useContent();
  const dynamicLogo = settings?.branding?.logoUrl;

  return (
    <img
      data-edit-id="branding.logoUrl"
      data-edit-name="Branding · Logo"
      data-edit-kind="image"
      data-edit-path="branding.logoUrl"
      src={dynamicLogo || logoImg}
      alt={title || "Nandhini C Logo"}
      style={{ width: size, height: size }}
      className={`object-contain rounded-md ${!dynamicLogo ? 'invert brightness-125 contrast-125' : ''} ${className}`}
    />
  );
}
