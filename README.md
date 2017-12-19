#Quick Start

## Overview
Front end react-redux application to display listings.

## Architecture

Global state resides in redux store -- local state for copy/paste components not wired for redux. Microservice architecture designed for REST

### Data Flow

`SOURCE SYSTEMS		  PostgreSQL			REST API (Express)			metes.io app 			mongo
==============		==============			==================			============			=====
Acquire data -----> Source Storage <------ /api/foreclosures <--------> Redux store <---------> appdata(login,etc)`

## JIRA

Can be found here: [JIRA](https://serouslabs.atlassian.net/secure/RapidBoard.jspa?rapidView=1)

## Development Stack

* Chrome
* React DevTools (React)
* Redux DevTools (Redux)
* npm

## Installation

Open shell/command prompt

1. git clone https://username@bitbucket.org/smada/metes.git (be sure to replace username with your bitbucket username)
2. cd metes
3. npm install
4. npm start (npm run start)
5. navigate to http://localhost:3000 in Chrome

## CLI Commands

### Development

```Shell
npm run start
```

Starts the development server running on `http://localhost:3000`

### Generators

```Shell
npm run generate
```

Allows you to auto-generate boilerplate code for common parts of your
application, specifically `component`s, and `container`s. You can
also run `npm run generate <part>` to skip the first selection. (e.g. `npm run
generate container`)

## Server

### Development

```Shell
npm start
```

Starts the development server and makes your application accessible at
`localhost:3000`. Tunnels that server with `ngrok`, which means the website
accessible anywhere! Changes in the application code will be hot-reloaded.

### Production

```Shell
npm run start:production
```

 * Runs tests (see `npm test`)
 * Builds your app (see `npm run build`)
 * Starts the production server (see `npm run start:prod`)

The app is built for optimal performance: assets are
minified and served gzipped.

### Host and Port

To change the host and/or port the app is accessible at, pass the `--host` and/or `--port` option to the command
with `--`. E.g. to make the app visible at `my-local-hostname:5000`, run the following:
`npm start -- --host my-local-hostname --port 5000`

## Building

```Shell
npm run build
```

Preps your app for deployment (does not run tests). Optimizes and minifies all files, piping them to the `build` folder.

Upload the contents of `build` to your web server to
see your work live!

## Testing

See the [testing documentation](../testing/README.md) for detailed information
about our testing setup!

## Unit testing

```Shell
npm test
```

Tests your application with the unit tests specified in the `**/tests/*.js` files
throughout the application.  
All the `test` commands allow an optional `-- [string]` argument to filter
the tests run by Jest. Useful if you need to run a specific test only.

```Shell
# Run only the Button component tests
npm test -- Button
```

### Watching

```Shell
npm run test:watch
```

Watches changes to your application and re-runs tests whenever a file changes.

### Remote testing

```Shell
npm run start:tunnel
```
Starts the development server and tunnels it with `ngrok`, making the website
available on the entire world. Useful for testing on different devices in different locations!

### Dependency size test

```Shell
npm run analyze
```

This command will generate a `stats.json` file from your production build, which
you can upload to the [webpack analyzer](https://webpack.github.io/analyse/) or [Webpack Visualizer](https://chrisbateman.github.io/webpack-visualizer/). This
analyzer will visualize your dependencies and chunks with detailed statistics
about the bundle size.

## Linting

```Shell
npm run lint
```

Lints your JavaScript.
