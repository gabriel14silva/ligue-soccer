CREATE DATABASE liguesoccersistemdb

CREATE TABLE information_league(
    id SERIAL PRIMARY KEY,
    nombre_competicion VARCHAR(255) UNIQUE,
    tipo_competicion VARCHAR(255),
    descripcion_corta VARCHAR(255),
    deporte VARCHAR(255),
    genero VARCHAR(255)
);
