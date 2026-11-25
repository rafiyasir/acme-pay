# Performance notes

## Database
- Indexes: (country), (job_title), (country, job_title), unique (lower(email)).
- Aggregations in SQL with `percentile_cont`; never load all rows into Node.
- Search is a case-insensitive "contains" on three columns. A scan of 10,000 rows is fast; add a `pg_trgm` index only if measured slow.

## API
- Pagination: offset, max page size 100. Keyset pagination is the scaling path beyond ~1M rows.

## Frontend
- Server-side pagination and filters, debounced search, query caching.
