CREATE TABLE doodle(
    id          SERIAL PRIMARY KEY,
    "postDate"  TIMESTAMP NOT NULL,
    "filePath"  VARCHAR,
    title       VARCHAR(64)
);