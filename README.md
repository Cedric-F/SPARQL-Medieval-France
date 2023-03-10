_This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)._

# Castles of France (a revisited version of Medieval France using SPARQL)

A React Application using the Google Maps API to showcase some of the French legacy.

## Getting started

**Installation**

_Cloning the development branch_

```
git clone https://github.com/Cedric-F/SPARQL-Medieval-France.git
```

_**Dependencies and local use**_

* `npm install` to install the dependencies.
* `npm start` to start a server and test the development build on `localhost:3000`.

## Structure

```
├── CONTRIBUTING.md
├── README.md - This file.
├── package.json
├── public/
│   ├── splash.png
│   ├── icon.png
│   ├── favicon.png
│   ├── favicon.ico
│   ├── manifest.json
│   └── index.html
└── src/
    ├── Components/
    │   ├── Filter.js
    │   ├── List.js
    │   ├── Map.js
    │   ├── Marker.js
    │   └── Fact.js
    ├── Fonts/
    │   └── Cardinal.woff
    ├── Icons/
    │   └── Castle.webp
    ├── Images/
    │   ├── Side.web
    │   └── Map-Border.png
    ├── map-style.json
    ├── locations.json
    ├── registerServiceWorker.js
    ├── App.css
    ├── App.test.js
    ├── App.js
    ├── index.css
    └── index.js
```

## Application features

Name                 | Description
---------------------|------------
Accessibility        | Aria labels and a fully managed focus make the navigation easier and Screen Readers-friendly.
Responsive Design    | The application fits perfectly on basically all the common device screens and remains easy to use on small viewports.
Custom map           | The Google Map uses a home-made paper-like style to perfectly fit in the application theme.
Trust-Worthy source  | The places history text is provided by dbpedia.

## Using the application

The application is really easy to use.
It shows a plethora of places in France, and the respective list-view on the side.
Using the filter at the top will gradually display only the places that match your query.
Simply click on the marker or the corresponding list item to open the modal that will showcase the place data.

When available, the data is fetched directly in the browser cache to prevent from sending a new request everytime for data that has already been visited, and to provide an offline-experience.

## License

None.

## Dependencies

The following dependencies have been used to build this project. Make sure to run npm install before launching the development build.

* [React](https://github.com/facebook/React)
* [React Bootstrap](https://github.com/react-bootstrap/react-bootstrap)
* [React Router](https://github.com/ReactTraining/react-router)
* [Google Map React](https://github.com/google-map-react/google-map-react)

### Credits

* The map legend icons are the property of [Bethesda](https://bethesda.net/en/).
* Most of the photos are from Wikipedia. If not, the source is mentionned right under it in the modal.

## Compatibility

Tested on:

* Chrome
* Chrome Canary
* FireFox (65+)
* FireFox Dev Edition
