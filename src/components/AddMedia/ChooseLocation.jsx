import * as React from 'react';
import { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';

function createOption(location) {
  return (
    {
      label: location.dataValues.name,
      value: location.dataValues.name.toLowerCase().replace(/\W/g, ''),
      id: location.dataValues.id,
    }
  )
}

export default function ChooseLocation({mediaLocation, setMediaLocation}) {

  /** COMPONENT STATE */
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState();

  /** EFFECTS */
  useEffect(() => {
    // Set the initial available options
    async function getLocations() {
      const allLocations = await window.electronAPI.getAllLocations();
      setOptions(allLocations.map(createOption));
    }

    getLocations()
  }, [])

  useEffect(() => {
    if (!mediaLocation) {
      setSelectedOption(null);
    }
  }, [])

  /** EVENT FUNCTIONS */
  async function handleCreate(inputValue) {
    setIsLoading(true);

    try {
      // Create a new location
      const newLocation = await window.electronAPI.createLocation(inputValue);
      console.log(newLocation);
      const newOption = createOption(newLocation);

      // Add person to options for selection
      setOptions((prev) => [...prev, newOption]);

      // Make new location the new chosen location
      setSelectedOption(newOption);
      setMediaLocation(newOption.id);

      setIsLoading('False');
    } catch (error) {
      console.error(error);
    }
  }

  // When a user selects a person, add it to the list of people in media
  async function onChange(newSelectedOption) {
    // Add person to list of chosen in media
    setSelectedOption(newSelectedOption);
    if (newSelectedOption) {
      setMediaLocation(newSelectedOption.id);
    } else {
      setMediaLocation(undefined);
    }
  }

  return (
    <>
      <CreatableSelect 
      isClearable
      isDisable={isLoading}
      onChange={onChange}
      onCreateOption={handleCreate}
      options={options}
      value={selectedOption}
      />
    </>
  )

}
