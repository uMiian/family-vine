import * as React from 'react';
import { useState } from 'react';

export default function FamilyVineFolderExample() {
  // Create state for new family vine names
  const [newFamilyVineName, setNewFamilyVineName] = useState('');
  async function loadFamilyVine() {
    try {
      await window.electronAPI.loadFamilyVine();
    } catch (error) {
      console.error(error);
    }
  }
  
  async function createFamilyVine(event) {
    try {
      await window.electronAPI.createFamilyVine(newFamilyVineName);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Load Family Vine</h1>
      <button onClick={loadFamilyVine}>Load</button>

      <h1>Create Family Vine</h1>
      <p>New Family Vine Name:</p>
      <input onChange={(event) => {setNewFamilyVineName(event.target.value);}}/>
      <button onClick={createFamilyVine}>Create</button>
    </>
  ) 

}
