CREATE DATABASE arquitectura;

USE arquitectura;

-- TABLA QUE GUARDARA LOS USUARIOS
CREATE TABLE USERS(
    ts_creation TIMESTAMP NOT NULL DEFAULT NOW()::TIMESTAMP,
    row_id SERIAL NOT NULL,
    name VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    identification BIGINT NOT NULL,
    email VARCHAR(500) NOT NULL,
    cellphone BIGINT NOT NULL,
    sex TEXT NOT NULL,
    birthdate DATE NOT NULL,
    password VARCHAR NOT NULL,
    role TEXT NOT NULL,
    house_address VARCHAR(100) NOT NULL,
    active_ind INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT USERS_PK
        PRIMARY KEY (row_id),
    CONSTRAINT IDENTIFICATION_NO_REPEAT UNIQUE(identification)
);