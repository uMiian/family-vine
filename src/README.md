# Source Code

This is the meat of the project where all the tools and logic was used/written. The code can be thought of as being divided into a front-end and a back-end.

## Frontend

The frontend code is responsible for rendering all of the desktop application to the user (this is also where react was used). It can be found in the `app.jsx`, which is the entry point for the frontend, and the `components` folder which contains all of the modularized react code.

An important note of the front-end code is that it does not explicitly call **electron** functions. Instead it communicates through the **electronAPI**, which is a method for exposing back-end services and functions to the frontend. The electronAPI is created in the `preload.js`.

It's also useful to note that the `renderer.js` is typically where these **electronAPI** function calls are made whenever using base HTML, JS, and CSS, but since we're using react, we can make function calls in our JSX files. This means that `renderer.js` goes unused but we keep it anyway.

## Back end

The back-end is responsible for managing the family vine instance. This means creating connections to the family vine databases, saving and reading files from a family vine folder, and adding new media to the family vine. 

The first component of the backend is the `db` folder which contains all **sequelize** code. It basically defines the models and their relationships. After that, we have the `services` folder which exposes functions for managing the current family vine instances. In other words, the services expose functions for creating, removing, and updating media in a family vine. Lastly, there is the `handlers` folder which just exposes functions for the front-end to use.

The only other backend file is `main.js` which defines settings for the electron app and oads all the handlers from the `handlers` folder.
