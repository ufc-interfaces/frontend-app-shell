# Frontend Application Shell

This frontend app integrates other frontends in a micro-frontends architecture, using Webpack Module Federation plugin.


## Run the app

Make sure you have the apps properly set up in ./webpack.config.apps-sources.json. External URLs should be working when you want to use an app from an external server. Filter the apps you want to run locally by setting a LOCAL_APPS envvar in the .env file (create one based on the .env.defaults if needed).

Hit `yarn install` to install local dependencies and `yarn start` to spin up the application shell. The application should be running on local address http://localhost:3020.
