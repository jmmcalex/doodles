#!/bin/bash

echo "Configuring doodlesdb"

# drop and recreate the doodles database
dropdb -U jonny doodlesdb
createdb -U jonny doodlesdb

# Load tables into the database
psql -U jonny doodlesdb < ./bin/sql/account.sql
psql -U jonny doodlesdb < ./bin/sql/doodle.sql
psql -U jonny doodlesdb < ./bin/sql/tag.sql
psql -U jonny doodlesdb < ./bin/sql/doodleTag.sql

# TODO set up file to feed in default tags for the tag table

# end database configuration
echo "Done configuring doodlesdb" 