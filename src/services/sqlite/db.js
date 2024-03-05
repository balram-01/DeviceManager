import SQLite from 'react-native-sqlite-storage';

// Open a connection to the SQLite database
const openDatabase = () => {
  return new Promise((resolve, reject) => {
    SQLite.openDatabase(
      {
        name: 'testDb',
        location: 'default',
      },
      db => {
        console.log('Database opened successfully');
        resolve(db);
      },
      error => {
        console.error('Error opening database: ', error);
        reject(error);
      }
    );
  });
};

// Create candidates table if it doesn't exist
const createTable = () => {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS candidates (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, gender TEXT, dateOfBirth TEXT, category TEXT)',
            [],
            () => {
              console.log('Table created successfully');
              resolve();
            },
            error => {
              console.error('Error creating table: ', error);
              reject(error);
            }
          );
        });
      })
      .catch(error => {
        console.error('Error opening database: ', error);
        reject(error);
      });
  });
};

// Save candidate data
const saveCandidateData = (candidateName, selectedGender, dateOfBirth, selectedCategory) => {
  openDatabase()
    .then(db => {
      // Insert candidate data into the database
      createTable()
        .then(() => {
          db.transaction(tx => {
            tx.executeSql(
              'INSERT INTO candidates (name, gender, dateOfBirth, category) VALUES (?, ?, ?, ?)',
              [String(candidateName), String(selectedGender), dateOfBirth.toISOString(), String(selectedCategory)],
              (_, result) => {
                // Handle success
                console.log('Candidate data saved successfully');
              },
              error => {
                // Handle error
                console.error('Error saving candidate data: ', error);
              }
            );
          });
        })
        .catch(error => {
          console.error('Error creating table: ', error);
        });
    })
    .catch(error => {
      console.error('Error opening database: ', error);
    });
};
const fetchCandidates = () => {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM candidates',
            [],
            (_, resultSet) => {
              const candidates = [];
              for (let i = 0; i < resultSet.rows.length; i++) {
                const row = resultSet.rows.item(i);
                candidates.push([row.name, row.gender, row.dateOfBirth, row.category, row.isActive, row.id]);
              }
              resolve(candidates);
            },
            error => {
              console.error('Error fetching candidates: ', error);
              reject(error);
            }
          );
        });
      })
      .catch(error => {
        console.error('Error opening database: ', error);
        reject(error);
      });
  });
};


export { createTable, saveCandidateData,openDatabase ,fetchCandidates};
