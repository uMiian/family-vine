# Family Vine

TODO: Pictures of app

## What is Family Vine

Family Vine is a media manager with an added empahsis on maintaing your family story. Alongside saving media, it also allows you to tag it with relevant information, like who's in it, where it was taken, and for what event. In doing so, family vine weaves together a story of events through your photos and videos. What's more is that it allows you to traverse this story as you add more memories!

## Tools

* Electron 
* React 
* SqLite3 (TODO: We can change this lol)

### Prerequisites

* [node.js (v20.17.0) and npm (v10.8.2)](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [python (v3.12)](https://www.python.org/downloads/) (If we decide to use this for the backend)

### Installation

After cloning the github repository and ensuring you have the prequisites installed, navigate to the project directory and open your terminal.

Run the following command to install all the application node dependencies:
```{bash}
npm i
```

Now, simply run the application with the following command:
```{bash}
npm run start
```
### Testing

After completing installation you can run the tests

Run the following command to run the tests specified in the jest.config.mjs file
```{bash}
npm test
```

You can run individual tests by specifying their file path using node for example:
```{bash}
node tests/unit/main/models/media.mjs
```
but since our tests use the jest configs like '@models/media.js' node doesn't recognize the package so need to fix this.