# DemoMaps

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.10.

This project is a test ground for linear referencing and other geospatial data visualization.

## Running Project

This project uses Mapbox so requires an API key, to see this application up and running get a public API Key from Mapbox.

You will then need to create a `environment.ts` file in `src/environments/*`.

This file needs to have the following code for the project to run: 

```
export const environment = {
  production: false,
  MAPBOX_API_KEY: 'API KEY GOES HERE',
};
```

you can then run `npm i` to install the node_modules for the project. 

lastly run `ng serve` to run the project on localhost
