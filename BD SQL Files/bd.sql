CREATE TABLE songs (
    id SERIAL NOT NULL,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(75) NOT NULL,
    duration BIGINT NOT NULL,
    image VARCHAR(255) NOT NULL,
    genre_id BIGINT NOT NULL
);
ALTER TABLE song
ADD PRIMARY KEY (id);
CREATE TABLE music_genre (
    id SERIAL NOT NULL,
    genre VARCHAR(50) NOT NULL
);
ALTER TABLE music_genre
ADD PRIMARY KEY (id);
CREATE TABLE playlist (
    id SERIAL NOT NULL,
    user_id BIGINT NOT NULL,
    name BIGINT NOT NULL
);
ALTER TABLE playlist
ADD PRIMARY KEY (id);
CREATE TABLE users (
    id SERIAL NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(125) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);
ALTER TABLE users
ADD PRIMARY KEY (id);
ALTER TABLE users
ADD CONSTRAINT users_email_unique UNIQUE (email);
ALTER TABLE users
ADD CONSTRAINT users_username_unique UNIQUE (username);
CREATE TABLE playlist_songs (
    id SERIAL NOT NULL,
    song_id BIGINT NOT NULL,
    playlist_id BIGINT NOT NULL
);
ALTER TABLE playlist_songs
ADD PRIMARY KEY (id);
ALTER TABLE song
ADD CONSTRAINT song_genre_id_foreign FOREIGN KEY (genre_id) REFERENCES music_genre (id);
ALTER TABLE playlist
ADD CONSTRAINT playlist_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE playlist_songs
ADD CONSTRAINT playlist_songs_song_id_foreign FOREIGN KEY (song_id) REFERENCES song (id);
ALTER TABLE playlist_songs
ADD CONSTRAINT playlist_songs_playlist_id_foreign FOREIGN KEY (playlist_id) REFERENCES playlist (id);
/ / agregamos columnas a la tabla songs
ALTER TABLE songs
ADD COLUMN Mood VARCHAR(50),
ADD COLUMN Occasion VARCHAR(50),
    ADD COLUMN Weather VARCHAR(50);