#Quick Start

## Overview
Front end react-redux application to display listings.

## Architecture

Global state resides in redux store -- local state for copy/paste components not wired for redux. Microservice architecture designed for REST

### Data Flow

| Source Systems | Data Store (PostgreSQL) | REST API (Express) |   metes.io  | mongodb |
|----------------|-------------------------|--------------------|-------------|---------|
|     Listings   | Source Data (Enriched)  | /api/foreclosures  | Redux store | appdata |

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

## Datastore API Routes

API v1: https://serouslabs.com:8000/api

### Preforeclosure (Lis Pendens)

#### /preforeclosures

##### HTTP GET

Returns last 10,000 preforeclosures

```Shell
        "doc_id": "14576313",
        "defendant": "WHITNEY BANK ",
        "plaintiff": "18TH STREET LLC",
        "record_date": "2016-11-30T06:00:00.000Z",
        "orbook": "17792",
        "comments": "LOTS 1 AND 2 B11 LINDSLEYS SD PT OF PT L3 SEC 1 2 26",
        "orpage": "641",
        "doclink": "http://oncore.duvalclerk.com/showdetails.aspx?id=14576313&rn=0&pi=0&ref=search",
        "clerkfilenumber": "0",
        "transactionnumber": "0",
        "releasedate": null,
        "casenumber": "3150652",
        "imagecount": null,
        "imagelinks": null,
        "imagelink1": null,
        "lp_id": 37617,
        "state": "Florida",
        "county": "Duval"
```

#### /preforeclosures/county/:county

##### HTTP GET

Returns last 10,000 preforeclosures filtered by county

Example: /preforeclosures/county/Duval

```Shell
        "doc_id": "14576313",
        "defendant": "WHITNEY BANK ",
        "plaintiff": "18TH STREET LLC",
        "record_date": "2016-11-30T06:00:00.000Z",
        "orbook": "17792",
        "comments": "LOTS 1 AND 2 B11 LINDSLEYS SD PT OF PT L3 SEC 1 2 26",
        "orpage": "641",
        "doclink": "http://oncore.duvalclerk.com/showdetails.aspx?id=14576313&rn=0&pi=0&ref=search",
        "clerkfilenumber": "0",
        "transactionnumber": "0",
        "releasedate": null,
        "casenumber": "3150652",
        "imagecount": null,
        "imagelinks": null,
        "imagelink1": null,
        "lp_id": 37617,
        "state": "Florida",
        "county": "Duval"
```

#### /preforeclosures/id/:id

##### HTTP GET

Returns a single result. Lookup based on fcl_id in data store.

Example: /preforeclosures/id/37615

```Shell
        "doc_id": "14576447",
        "defendant": "STONE ADAM ",
        "plaintiff": "JAX METRO CREDIT UNION",
        "record_date": "2016-11-30T06:00:00.000Z",
        "orbook": "17792",
        "comments": "PT L15 B88 SPRINGFIELD",
        "orpage": "878",
        "doclink": "http://oncore.duvalclerk.com/showdetails.aspx?id=14576447&rn=0&pi=0&ref=search",
        "clerkfilenumber": "0",
        "transactionnumber": "0",
        "releasedate": null,
        "casenumber": "3150705",
        "imagecount": null,
        "imagelinks": null,
        "imagelink1": null,
        "lp_id": 37615,
        "state": "Florida",
        "county": "Duval"
```

### Foreclosures

#### /foreclosures

##### HTTP GET

Returns last 10,000 foreclosures where the saledate is in the future.

```Shell
        "fcl_id": 2477079,
        "casestatus": "Accepting Proxy",
        "state": "Florida",
        "county": "Duval",
        "saledate": "01/02/2018",
        "propertyzip": "32216",
        "propertyuse": "0400 Residential Condo",
        "propertyaddress": "1530 EL PRADO RD 6",
        "finaljudgement": "155216.06",
        "assessedvalue": "26000",
        "maxbid": "155216.06",
        "parcelid": "1371535012"
```

#### /foreclosures/sold

##### HTTP GET

Returns last 10,000 foreclosures where the saledate is in the past.

```Shell
        "fcl_id": 2477079,
        "casestatus": "Accepting Proxy",
        "state": "Florida",
        "county": "Duval",
        "saledate": "01/02/2018",
        "propertyzip": "32216",
        "propertyuse": "0400 Residential Condo",
        "propertyaddress": "1530 EL PRADO RD 6",
        "finaljudgement": "155216.06",
        "assessedvalue": "26000",
        "maxbid": "155216.06",
        "parcelid": "1371535012"
```

#### /foreclosures/county/:county

##### HTTP GET

Returns last 10,000 foreclosures where the saledate is in the future and filtered by county.

Example /foreclosures/county/Duval

```Shell
        "fcl_id": 2477079,
        "casestatus": "Accepting Proxy",
        "state": "Florida",
        "county": "Duval",
        "saledate": "01/02/2018",
        "propertyzip": "32216",
        "propertyuse": "0400 Residential Condo",
        "propertyaddress": "1530 EL PRADO RD 6",
        "finaljudgement": "155216.06",
        "assessedvalue": "26000",
        "maxbid": "155216.06",
        "parcelid": "1371535012"
```

#### /foreclosures/id/:id

##### HTTP GET

Returns a single foreclosure result. Lookup based on fcl_id.

Example /foreclosures/id/2477079

```Shell
        "fcl_id": 2477079,
        "timestamp": "2017-12-18T22:36:03.010Z",
        "saledate": "01/02/2018",
        "parcelid": "1371535012",
        "state": "Florida",
        "county": "Duval",
        "casenumber": "16-2014-CA-007886-XXXX-MA",
        "listingtype": null,
        "propertyaddress": "1530 EL PRADO RD 6",
        "propertyaddress1": null,
        "propertycity": "JACKSONVILLE",
        "propertyowner": "SOUTHBROOK CONDOMINIUM ASSOCIATON INC",
        "propertyowner2": null,
        "propertyzip": "32216",
        "assessedvalue": "26000",
        "justmarketvalue": null,
        "numstructures": null,
        "legaldescription": "52-2S-27E, SOUTHBROOK CONDOMINIUM, UNIT 1530-6, O/R 7066-437",
        "landvalue": "0.00",
        "structurevalue": null,
        "propertyuse": "0400 Residential Condo",
        "zoning": "",
        "totalarea": "0.0",
        "structurearea": "725",
        "exteriorwall": "0",
        "exteriorwall2": "0",
        "interiorwall": "",
        "interiorwall2": "0",
        "interiorfloor": "0",
        "interiorfloor2": "0",
        "roofstructure": "",
        "roofcover": "",
        "heatingfuel": "0",
        "heatingtype": "0",
        "airconditioning": "0",
        "extra": "",
        "bedrooms": "1",
        "bathrooms": "1.0",
        "maxbid": "155216.06",
        "stories": "0",
        "grossarea": "0",
        "gislink": "http://maps.coj.net/WEBSITE/DuvalMapsSQL/viewer.htm?Layers=0110110000110000000000000000000000000000000000000000000000000000000000000000001000110&Tools=Yes&ActiveLayer=2&Query=RE%20%3D%20%27137153%205012%27&Queryzoom=Yes",
        "googlemapslink": "http://maps.google.com/maps?q=1530+EL+PRADO+RD,+Jacksonville+FL+32216",
        "appraiserlink": "http://apps.coj.net/pao_propertySearch/Basic/Detail.aspx?RE=1371535012",
        "subdivision": "03680 SOUTHBROOK CONDOMINIUM",
        "rooms": "0",
        "caselink": null,
        "plaintiff": "HSBC BANK USA, NATIONAL ASSOCIATION,",
        "defendant": "SOUTHBROOK CONDOMINIUM ASSOCIATON INC",
        "plaintiff2": null,
        "defendant2": null,
        "finaljudgement": "155216.06",
        "openingbid": null,
        "frontage": "0",
        "depth": "0",
        "uid": null,
        "lastsaledate": "1/16/2013",
        "lastsaleprice": "100.00",
        "acres": null,
        "yearbuilt": "1967",
        "index": "127",
        "casestatus": "Accepting Proxy",
        "marketlink": "Zillow link",
        "localimgpath": "2477079.jpeg"
```

### Utility Routes

#### /top/:route

##### HTTP GET

@Parameter :route
@Value foreclosure model column

Returns distinct group counts of route parameter where saledate is in the future. Input is column name from foreclosure model.

Example: saledate column

/top/saledate

```Shell
        [
    {
        "route": "01/08/2018",
        "count": "62"
    },
    {
        "route": "01/25/2018",
        "count": "43"
    },
    {
        "route": "01/09/2018",
        "count": "40"
    },
    {
        "route": "01/10/2018",
        "count": "34"
    },
    {
        "route": "01/22/2018",
        "count": "34"
    },
    {
        "route": "01/11/2018",
        "count": "30"
    },
    {
        "route": "01/23/2018",
        "count": "29"
    },
    {
        "route": "01/29/2018",
        "count": "28"
    },
    {
        "route": "02/08/2018",
        "count": "23"
    },
    {
        "route": "02/01/2018",
        "count": "22"
    },
    {
        "route": "01/31/2018",
        "count": "21"
    },
    {
        "route": "01/03/2018",
        "count": "20"
    },
    {
        "route": "01/17/2018",
        "count": "18"
    },
    {
        "route": "01/24/2018",
        "count": "17"
    },
    {
        "route": "01/16/2018",
        "count": "16"
    },
    {
        "route": "02/15/2018",
        "count": "15"
    },
    {
        "route": "02/22/2018",
        "count": "15"
    },
    {
        "route": "01/30/2018",
        "count": "12"
    },
    {
        "route": "02/07/2018",
        "count": "12"
    },
    {
        "route": "01/18/2018",
        "count": "10"
    },
    {
        "route": "02/21/2018",
        "count": "10"
    },
    {
        "route": "01/04/2018",
        "count": "9"
    },
    {
        "route": "02/13/2018",
        "count": "8"
    },
    {
        "route": "02/27/2018",
        "count": "8"
    },
    {
        "route": "02/05/2018",
        "count": "7"
    }
]
```

#### /mainstats

##### HTTP GET

Returns the following:

1. Average number of upcoming sales per day.
2. Average new listings per day.
3. Average final judgement per listing.
4. Total number of future sales scheduled.
5. Total number of sales tomorrow.
6. Total number of sales this week.

```Shell
        "avg_sales_per_sale_day": "28",
        "avg_new_listings_per_day": "50",
        "avg_fj": 194350.736094294,
        "num_future_sales": "607",
        "num_past_sales": "10883",
        "sales_tomorrow": "7",
        "sales_this_week": "11"
```
