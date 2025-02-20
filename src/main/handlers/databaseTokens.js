export class DataBaseTokens {
    static mediaTableCreator = `CREATE TABLE IF NOT EXISTS Media (
        MediaID INTEGER PRIMARY KEY AUTOINCREMENT,
        Filepath TEXT NOT NULL,
        Filetype TEXT NOT NULL
    );`;

    static personTableCreator = `CREATE TABLE IF NOT EXISTS Person (
        PersonID INTEGER PRIMARY KEY AUTOINCREMENT,
        FirstName TEXT NOT NULL,
        LastName TEXT NOT NULL
    );`;

    static mediaInfoTableCreator = `CREATE TABLE IF NOT EXISTS MediaInfo (
        MediaID INTEGER PRIMARY KEY,
        Location TEXT,
        Date TEXT,
        DescriptionOfWhat TEXT,
        DescriptionOfWhy TEXT,
        FOREIGN KEY (MediaID) REFERENCES Media(MediaID)
    );`;

    static mediaPersonTableCreator = `CREATE TABLE IF NOT EXISTS MediaPerson (
        MediaID INTEGER,
        PersonID INTEGER,
        PRIMARY KEY (MediaID, PersonID),
        FOREIGN KEY (MediaID) REFERENCES Media(MediaID),
        FOREIGN KEY (PersonID) REFERENCES Person(PersonID)
    );`;

    static mediaCapturedByTableCreator = `CREATE TABLE IF NOT EXISTS MediaCapturedBy (
        MediaID INTEGER PRIMARY KEY,
        PersonID INTEGER,
        FOREIGN KEY (MediaID) REFERENCES Media(MediaID),
        FOREIGN KEY (PersonID) REFERENCES Person(PersonID)
    );`;
}