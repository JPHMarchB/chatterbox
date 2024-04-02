DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS "like";
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS follow;
DROP TABLE IF EXISTS profile;


CREATE TABLE IF NOT EXISTS profile(
    profile_id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    profile_about VARCHAR(512),
    profile_activation_token CHAR(32),
    profile_email VARCHAR(128) NOT NULL UNIQUE,
    profile_hash CHAR(97) NOT NULL UNIQUE,
    profile_image_url VARCHAR(255),
    profile_name VARCHAR(32) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS follow(
    follow_profile_id UUID NOT NULL,
    follow_following_profile_id UUID NOT NULL,
    follow_date timestamptz NOT NULL,
    FOREIGN KEY (follow_profile_id) REFERENCES profile(profile_id),
    FOREIGN KEY (follow_following_profile_id) REFERENCES profile(profile_id),
    PRIMARY KEY (follow_profile_id, follow_following_profile_id)
);

CREATE TABLE IF NOT EXISTS post(
    post_id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    post_profile_id UUID NOT NULL,
    post_content VARCHAR(255) NOT NULL,
    post_datetime timestamptz NOT NULL DEFAULT NOW(),
    post_image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (post_profile_id) REFERENCES profile(profile_id)
);

CREATE TABLE IF NOT EXISTS comment(
    comment_id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    comment_post_id UUID NOT NULL,
    comment_profile_id UUID NOT NULL,
    comment_content VARCHAR(512) NOT NULL,
    comment_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    FOREIGN KEY (comment_post_id) REFERENCES post(post_id),
    FOREIGN KEY (comment_profile_id) REFERENCES profile(profile_id)
);

CREATE TABLE IF NOT EXISTS "like"(
    like_post_id UUID NOT NULL,
    like_profile_id UUID NOT NULL,
    like_date_time TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY (like_post_id) REFERENCES post(post_id),
    FOREIGN KEY (like_profile_id) REFERENCES profile(profile_id),
    PRIMARY KEY (like_post_id, like_profile_id)
);

CREATE TABLE IF NOT EXISTS tag(
    tag_comment_id UUID NOT NULL,
    tag_profile_id UUID NOT NULL,
    FOREIGN KEY (tag_comment_id) REFERENCES comment(comment_id),
    FOREIGN KEY (tag_profile_id) REFERENCES profile(profile_id),
    PRIMARY KEY (tag_comment_id, tag_profile_id)
);
