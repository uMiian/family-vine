import * as React from 'react';

export default function Sidebar({ className, title, children, dockable }) {
  // TODO: Add functionality for sliding (i.e. a button for docking the sidebar)
  return (
    <div className={className}>
      <h2>{title}</h2>
     {children}
    </div>
  )
}
