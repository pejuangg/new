import React, { useState } from 'react';

interface AppLogoProps {
  name: string;
  domain: string;
  accentColor?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  name,
  domain,
  accentColor = '#06b6d4',
  size = 'md',
  className = ''
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg p-1.5',
    md: 'w-12 h-12 rounded-xl p-2',
    lg: 'w-16 h-16 rounded-2xl p-2.5'
  };

  const iconSizes = {
    sm: 18,
    md: 28,
    lg: 38
  };

  // Google Favicon API
  const faviconUrl = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=128`;

  // Fallback icon based on app name
  const renderFallback = () => {
    const initial = name.charAt(0).toUpperCase();
    return (
      <div 
        className={`${sizeClasses[size]} flex items-center justify-center font-anton text-slate-900 font-bold shadow-md ${className}`}
        style={{ backgroundColor: accentColor }}
      >
        <span style={{ fontSize: iconSizes[size] * 0.75 }}>{initial}</span>
      </div>
    );
  };

  if (hasError) {
    return renderFallback();
  }

  return (
    <div className={`relative ${sizeClasses[size]} bg-white flex items-center justify-center shadow-lg shadow-black/40 border border-white/20 overflow-hidden ${className}`}>
      <img
        src={faviconUrl}
        alt={`${name} logo`}
        className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
      />
    </div>
  );
};
