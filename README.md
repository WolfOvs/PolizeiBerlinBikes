# PolizeiBerlinBikes

PolizeiBerlinBikes is Fe React app with a little BE middleware for https://bikeindex.org/ API.

## Installation

From polizeiberlinbikes folder run:

```bash
npm i
```

From middleware folder run:

```bash
npm i
```

...then run from polizeiberlinbikes:
```bash
npm run start 
```

and
```bash
npm run devStart
```

..from middleware folder


## Project description:

The application start at route '/' with the login.
If the user submit admin:admin the application redirect to homepage, otherwise you have a message error.

- When the login is performed the middleware generate a token that is passed to homepage
- in Homepage the FE call two api on post 3000 (localhost:3000)
  - /bikes: to GET the bikes from 10km from the center of Berlin, the middleware call: 

```bash
https://bikeindex.org:443/api/v3/search?page=${page}&per_page=10&location=Berlin&distance=10&stolenness=proximity
```

  - /bikesCount: to get the total numbers of bikes from 10km to the center of Berlin, the middleware call:

```bash
https://bikeindex.org:443/api/v3/search/count?location=Berlin&distance=10&stolenness=proximity
```

On homepage we have the table with bikes info, the pagination with the total and the map showing bikes positions.

-If we click on the table data or on the map icons the bikes are highlighted.

-If the image is not available I show a placeholder.

-If I am in the first page I disable the Previous button, if I am at the last page I disable Next page button.

-Using the search bar you can filter by title on the results that you have in the table and reset the search with the reset button.

Enjoy ;)