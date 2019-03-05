#!/bin/bash

echo "Configuring doodlesdb"

# drop and recreate the doodles database
dropdb -U jmmcalex doodlesdb
createdb -U jmmcalex doodlesdb

# Load tables into the database
psql -U jmmcalex doodlesdb < ./bin/sql/account.sql
psql -U jmmcalex doodlesdb < ./bin/sql/doodle.sql
psql -U jmmcalex doodlesdb < ./bin/sql/tag.sql
psql -U jmmcalex doodlesdb < ./bin/sql/doodleTag.sql

# TODO set up file to feed in default tags for the tag table

# end database configuration
echo "Done configuring doodlesdb" 