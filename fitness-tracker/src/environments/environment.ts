// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
      apiKey: "AIzaSyAzeAyop5FAOYR9aap7592_rgR27js800A",
      authDomain: "angularfitnesstracker.firebaseapp.com",
      databaseURL: "https://angularfitnesstracker.firebaseio.com",
      projectId: "angularfitnesstracker",
      storageBucket: "angularfitnesstracker.appspot.com",
      messagingSenderId: "1083214063263"    
  }
};
