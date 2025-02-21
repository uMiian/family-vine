export class DataBaseTokens {
    static mediaTableCreator = `CREATE TABLE IF NOT EXISTS Media (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filePath TEXT NOT NULL UNIQUE,
        fileType TEXT DEFAULT '',
        date TEXT NOT NULL,
        location TEXT DEFAULT '',
        what_description TEXT DEFAULT '',
        why_description TEXT DEFAULT ''
    );`;

    static personTableCreator = `CREATE TABLE IF NOT EXISTS Person (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    );`;

    static mediaContainsPersonTableCreator = `CREATE TABLE IF NOT EXISTS MediaContainsPerson (
        MediaID INTEGER,
        PersonID INTEGER,
        PRIMARY KEY (MediaID, PersonID),
        FOREIGN KEY (MediaID) REFERENCES Media(id),
        FOREIGN KEY (PersonID) REFERENCES Person(id)
    );`;

    static mediaCapturedByPersonTableCreator = `CREATE TABLE IF NOT EXISTS MediaCapturedByPerson (
        MediaID INTEGER,
        PersonID INTEGER,
        PRIMARY KEY (MediaID, PersonID),
        FOREIGN KEY (MediaID) REFERENCES Media(id),
        FOREIGN KEY (PersonID) REFERENCES Person(id)
    );`;
}
