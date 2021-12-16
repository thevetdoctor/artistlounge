import React from 'react';
import Artists from './components/Artists';

function App() {
  const baseUrl = 'https://jsonplaceholder.typicode.com';

  return (
    <div style={{fontFamily: 'Roboto'}} className="font-bold bg-gray-600 text-center p-3 h-full">
      <h2 style={{fontFamily: 'Architects Daughter'}} className="text-3xl font-bold my-3 text-white">
        Chocolate City
      </h2>
      <Artists baseUrl={baseUrl} />
    </div>
  );
}

export default App;
