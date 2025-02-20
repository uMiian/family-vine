import sqlite3 from 'sqlite3';
import { DataBaseTokens } from './databaseTokens.js';

const db = new sqlite3.Database('media_database.db', (err) => {
    if (err) console.error(err.message);
    else console.log('Connected to the SQLite database.');
});

const dbTokens = new DataBaseTokens();

const createTables = () => {
    db.serialize(() => {
        db.run(DataBaseTokens.mediaTableCreator);
        db.run(DataBaseTokens.personTableCreator);
        db.run(DataBaseTokens.mediaInfoTableCreator);
        db.run(DataBaseTokens.mediaPersonTableCreator);
        db.run(DataBaseTokens.mediaCapturedByTableCreator);
        console.log('Tables created successfully.');
    });
};

createTables();

db.close((err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Closed the database connection.');
    }
});