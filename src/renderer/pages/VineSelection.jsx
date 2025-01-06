import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import Sidebar from '@components/Sidebar.jsx';
import PrimaryButton from '@components/button/PrimaryButton.jsx';
import BackButton from '@components/button/BackButton.jsx';
import PrimaryInput from '@components/input/PrimaryInput.jsx';

import '@styles/VineSelection.css';
import '@styles/Sidebar.css';

export default function VineSelection() {
  let navigate = useNavigate();

  /* STATE */
  const [isCreatingVine, setIsCreatingVine] = useState(false);
  const [newVineName, setNewVineName] = useState('');
  const [newVineDirectory, setNewVineDirectory] = useState('');


  // TODO: Replace with fetch function to get recently visited vines
  const recentVines = [
    {
      "key": 1,
      "name": 'Family Vine 1', 
      "path": 'path/to/vine1',
    },
    {
      "key": 2,
      "name": 'Family Vine 2', 
      "path": 'path/to/vine2',
    },
    {
      "key": 3,
      "name": 'Family Vine 3', 
      "path": 'path/to/vine3',
    },
  ];

  /* HANDLE FUNCTIONS */
  async function handleCreateVine() {
    // Show the form for creating a vine
    setIsCreatingVine(true);
  }

  async function handleChooseNewVineDirectory() {
    // Prompt the user for the new directory

    // Set the new directory
    setNewVineDirectory('new/vine/directory');
  }

  async function handleCreateVineForm(event) {
    // Show the creation form
  
    // Get the vine name and where to make the folder
    
    // Try to create the folder
    
    // Redirect to vine traversal
    navigate('/traversal');
  }

  async function handleBackButtonClick(event) {
    event.preventDefault();
    // Set form fields to be blank
    setNewVineName('');
    setNewVineDirectory('');

    // Go back to create/load screen
    setIsCreatingVine(false);
  }

  async function handleLoadVine() {
    // Prompt the user for a family vine folder
    
    // Try to load the folder
    
    // Redirect to vine traversal
    navigate('/traversal');
  }

  async function handleLoadRecentVine(event) {
    // Get the path to the vine

    // Try to load the vine

    // Redirect to vine traversal
    navigate('/traversal');
  }

  return (
    <div className='vine-selection'>

      <Sidebar className='primary-sidebar' title='Recent Vines'>
        <ol> {recentVines.map((vine) => (
            <li key={vine.key} onClick={handleLoadRecentVine}>
              <h4>{vine.name}</h4>
              <p>{vine.path}</p>
            </li>
          ))}
        </ol>
      </Sidebar>

      <div className='main'>
        <h1>Family Vine</h1>
        <p>Version 0.0.0</p>

        {isCreatingVine ? (
          <form className='creation-form'>
            <div className='selection'>
              <div>
                <h3>Name of Vine</h3>
                <p>Enter the name of your family vine</p>
              </div>
              <PrimaryInput value={newVineName} placeholder='Vine Name'
                onChange={(event) => setNewVineName(event.target.value)}
              />
            </div>
            <hr />
            <div className='selection'>
              <div>
                <h3>Choose Directory</h3>
                <p>Choose a directory to create the family vine folder in</p>
              </div>
              <PrimaryButton className='primary-button' 
                             onClick={handleChooseNewVineDirectory}>
              {!newVineDirectory ? 
                <text>Choose</text> :
                <text>{newVineDirectory}</text> }
              </PrimaryButton>
            </div>
            <div className='creation-form-footer'>
              <BackButton onClick={handleBackButtonClick} />
              <PrimaryButton className='submit-button' type='submit'
                             onClick={handleCreateVineForm}
                             disabled={!newVineName || !newVineDirectory}>
               Submit 
              </PrimaryButton>
            </div>
          </form>
        ) : (
        <div className='selections'>
          <div className='selection'>
            <div>
              <h3>Create Vine</h3>
              <p>Create a family vine folder in a folder</p>
            </div>
            <PrimaryButton className='primary-button' onClick={handleCreateVine}>
              Create
            </PrimaryButton>
          </div>
          <hr/>

          <div className='selection'>
            <div>
              <h3>Load Vine</h3>
              <p>Load a family vine folder</p>
            </div>
            <PrimaryButton className='primary-button' onClick={handleLoadVine}>
              Load
            </PrimaryButton>
          </div>
          <hr/>
        </div>
        )}
      </div>
    </div>
  )
}
