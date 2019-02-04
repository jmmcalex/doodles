CREATE TABLE doodleTag(
    "doodleId"    INTEGER,
    "tagId"      INTEGER,
    FOREIGN KEY ("doodleId") REFERENCES doodle(id),
    FOREIGN KEY ("tagId")   REFERENCES tag(id)
);