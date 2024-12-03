import * as React from 'react';
import { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';

function createOption(person) {
  const fullname = person.dataValues.firstName + " " + person.dataValues.lastName;
  return (
    {
      label: fullname,
      value: fullname.toLowerCase().replace(/\W/g, ''),
      id: person.dataValues.id,
    }
  )
}

export default function ChoosePeople({peopleInMedia, setPeopleInMedia}) {

  /** COMPONENT STATE */
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  /** EFFECTS */
  useEffect(() => {
    // Set the initial available options
    async function getPeople() {
      const allPeople = await window.electronAPI.getAllPeople();
      setOptions(allPeople.map(createOption));
    }

    getPeople()
  }, [])

  useEffect(() => {
    if (!peopleInMedia) {
      setOptions([]);
    }
  });

  /** EVENT FUNCTIONS */
  async function handleCreate(inputValue) {
    setIsLoading(true);

    // Parse the input
    const fullName = inputValue.split(' ');
    const firstName = fullName[0];
    const lastName = fullName[1];

    try {
      // Create a new person
      const newPerson = await window.electronAPI.createPerson(firstName, lastName);
      const newOption = createOption(newPerson);

      // Add person to options for selection
      setOptions((prev) => [...prev, newOption]);

      // Add person to list of chosen in media
      setSelectedOptions((prev) => [...prev, newOption]);
      setPeopleInMedia((prev) => [...prev, newOption.id])

      setIsLoading('False');
    } catch (error) {
      console.error(error);
    }
  }

  // When a user selects a person, add it to the list of people in media
  async function onChange(newSelectedOptions) {
    // Add person to list of chosen in media
    setSelectedOptions(newSelectedOptions);
    const ids = newSelectedOptions.map((option) => option.id)
    setPeopleInMedia(ids);
  }

  return (
    <>
      <CreatableSelect 
      isClearable
      isMulti
      isDisable={isLoading}
      onChange={onChange}
      onCreateOption={handleCreate}
      options={options}
      value={selectedOptions}
      />
    </>
  )

}
