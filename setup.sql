CREATE DATABASE life_protector_db;
USE life_protector_db;

CREATE TABLE emergency_triggers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lat VARCHAR(50),
    lng VARCHAR(50),
    network_state VARCHAR(20),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);