# Models Folder
This folder contains all of the models for the application. If you're unfamiliar with ORM's, models are just javascript objects that sequelize creates so that we can interact with the database. Each model is associated with a table in the database.

Each model definition only defines the structure of the model (attributes, primary keys, etc.), but it does not specify relationships. For this, go to `db/index.js`

## Current Models
* Media Model: `media.model.js`
* Person Model: `person.model.js`
* Location Model: `location.model.js`


## When to Update
This folder should only ever be updated whenever we are deleting/adding/updating a model.
