import React from 'react';
import { useIsFetching } from '@tanstack/react-query';
import { useNavigation } from 'react-router-dom';

const GlobalLoadingBar: React.FC = () => {
  const isFetching = useIsFetching();
  const navigation = useNavigation();

  const isNavigating = navigation.state === 'loading';
  const active = isFetching > 0 || isNavigating;

  if (!active) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-transparent overflow-hidden pointer-events-none">
      <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-600 animate-loading-bar w-full origin-left shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
    </div>
  );
};

export default GlobalLoadingBar;
