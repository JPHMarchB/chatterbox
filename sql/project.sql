DROP TABLE IF EXISTS profile;

CREATE TABLE IF NOT EXISTS profile(
    profile_id UUID NOT NULL PRIMARY KEY,
    profile_about VARCHAR(512),
    profile_activation_token CHAR(32),
    profile_email VARCHAR(128) NOT NULL UNIQUE,
    profile_hash CHAR(97) NOT NULL UNIQUE,
    profile_image_url VARCHAR(255),
    profile_name VARCHAR(32) NOT NULL UNIQUE
);