import * as React from 'react';
import '@styles/Sidebar.css';

export default function SecondarySidebar({ className, title, children, dockable }) {
  // TODO: Add functionality for sliding (i.e. a button for docking the sidebar)
  return (
    <div className={`secondary-sidebar ${className}`}>
      <h2>{title}</h2>
      <div className='content'>  
       {children}
      </div>
    </div>
  )
}
