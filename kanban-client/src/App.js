import React from 'react';
import Kanban from './Components/Kanban'

export default function App() {
  return (
    <React.Fragment>
      <div className="container is-fullhd">
        <div className="section">
          <Kanban />
        </div>
      </div>
    </React.Fragment>
  );
}
