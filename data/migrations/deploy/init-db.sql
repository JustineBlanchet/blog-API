-- Deploy oblog:init-db to pg

BEGIN;

CREATE DOMAIN routeType as TEXT
CHECK (VALUE ~ '^\/[a-z0-9]*$');

CREATE DOMAIN slugType as TEXT
CHECK (VALUE ~ '^[a-zÀ-ÿ0-9-]+-[a-zA-ZÀ-ÿ0-9-]+$');

CREATE TABLE category (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    route routeType UNIQUE NOT NULL,
    label text UNIQUE NOT NULL
);

CREATE TABLE post (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text NOT NULL,
    slug slugType NOT NULL,
    excerpt text NOT NULL,
    content text NOT NULL,
    category_id int REFERENCES category(id) NOT NULL
);

COMMIT;
