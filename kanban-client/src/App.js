import React from 'react';
import Kanban from './Components/Kanban'
import Header from './Components/Header';

export default function App() {
  return (
    <React.Fragment>
      <Header hasLogout={true} />
      <div className="container is-fullhd">
        <div className="section">
          <Kanban />
        </div>
      </div>
    </React.Fragment>
  );
}
