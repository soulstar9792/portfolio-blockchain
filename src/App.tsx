import React from 'react';

// Lazy loaded components
const Navbar = React.lazy(() => import('./components/Navbar'));
const Welcome = React.lazy(() => import('./components/Welcome'));
const Who = React.lazy(() => import('./components/Who'));
const What = React.lazy(() => import('./components/What'));
const Whiz = React.lazy(() => import('./components/Whiz'));
const Which = React.lazy(() => import('./components/Which'));
const Where = React.lazy(() => import('./components/Where'));
const StarryBackground = React.lazy(() => import('./components/StarryBackground'));

const App: React.FC = () => {
  return (
    <div style={{ userSelect: 'none', WebkitUserSelect: 'none', MozUserSelect: 'none' }}>
      <StarryBackground />
      <div className="bg-transparent text-white font-sans">
        <Navbar />
        <div className="flex flex-col items-center xxl:p-40 xl:p-20 lg:p-10 md:p-5 p-5 min-h-screen">
          <Welcome />
          <Who />
          <What />
          <Which />
          <Whiz />
          <Where />
        </div>
      </div>
    </div>
  );
};

export default App;