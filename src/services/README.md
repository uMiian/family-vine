# Services
A service is meant to be a kind of interface between two entities. In this case, the services in this folder are meant to connect the handlers to entities like the database models, database instance, and the file system.

Each one of them manages some state for the application and in many cases rely on each other state to work.

## Current Services
* `DatbaseService.js`: This manages the current sequelize instance as well as the models.
* `Working.js`: This manages the current family vine connection
* `DirectoryManagementService.js`: This manages the media model for the current database instance.
  * Relies on the models from the sequelize instance from `databaseService.js`
* `LocationServcie.js`: This manages the location model for the current database instance.
  * Relies on the models from the sequelize instance from `databaseService.js`
* `PersonServcie.js`: This manages the Person model for the current database instance.
  * Relies on the models from the sequelize instance from `databaseService.js`
