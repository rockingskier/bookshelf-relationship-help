# BookshelfJS Relationship Help

Looking for help with BookshelfJS returning and formatting `piovt` data using
BookshelfJS, https://github.com/tgriesser/bookshelf/issues/765

## Install

```bash
npm install -g knex   # Possibly also need sqlite3?
npm install
```


## Database
 There is a pre-populated DB so you can run the script without data issues.

 Alternatively you can build a fresh DB with th following commands

 ```bash
 rm dev.sqlite
 knex migrate:latest
 knex seed:run
 ```
