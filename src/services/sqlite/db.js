import SQLite from 'react-native-sqlite-storage';

// Open a connection to the SQLite database
const openDatabase = () => {
  return new Promise((resolve, reject) => {
    SQLite.enablePromise(true);
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
const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const saveCandidateData = (candidateName, selectedGender, dateOfBirth, selectedCategory) => {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then(db => {
        createTable() // Moved createTable() inside openDatabase().then()
          .then(() => {
            db.transaction(tx => {
              // Check if the candidate already exists
              tx.executeSql(
                'SELECT * FROM candidates WHERE name = ?',
                [candidateName],
                (_, resultSet) => {
                  if (resultSet.rows.length > 0) {
                    console.log('Candidate already exists');
                    resolve(false); // Candidate already exists, resolve with false
                  } else {
                    const formattedDateOfBirth = formatDate(dateOfBirth);
                    // Insert candidate data into the database
                    tx.executeSql(
                      'INSERT INTO candidates (name, gender, dateOfBirth, category) VALUES (?, ?, ?, ?)',
                      [String(candidateName), String(selectedGender), formattedDateOfBirth, String(selectedCategory)],
                      (_, result) => {
                        // Handle success
                        console.log('Candidate data saved successfully');
                        resolve(true); // Candidate added successfully, resolve with true
                      },
                      error => {
                        // Handle error
                        console.error('Error saving candidate data: ', error);
                        reject(error); // Reject promise if there's an error saving candidate data
                      }
                    );
                  }
                },
                error => {
                  console.error('Error checking candidate existence: ', error);
                  reject(error); // Reject promise if there's an error checking candidate existence
                }
              );
            });
          })
          .catch(error => {
            console.error('Error creating table: ', error);
            reject(error); // Reject promise if there's an error creating the table
          });
      })
      .catch(error => {
        console.error('Error opening database: ', error);
        reject(error); // Reject promise if there's an error opening the database
      });
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

const createPictureTable = () => {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS picture (id INTEGER PRIMARY KEY, pictureUri TEXT)',
            [],
            () => {
              console.log('Picture table created successfully');
              resolve();
            },
            error => {
              console.error('Error creating picture table: ', error);
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

// Save candidate picture URI
const saveCandidatePicture = (imageUri) => {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then(db => {
        createPictureTable()
        db.transaction(tx => {
          // Insert or replace picture URI
          tx.executeSql(
            'INSERT OR REPLACE INTO picture (id, pictureUri) VALUES (?, ?)',
            [1, imageUri], // Use a placeholder ID, such as 1
            (_, result) => {
              console.log('Picture URL saved successfully');
              resolve(true);
            },
            error => {
              console.error('Error saving picture URL: ', error);
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
const getStoredPicture = () => {
  return new Promise((resolve, reject) => {
    openDatabase()
      .then(db => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT pictureUri FROM picture WHERE id = ?',
            [1], // Assuming you are storing picture with ID 1
            (_, resultSet) => {
              if (resultSet.rows.length > 0) {
                const row = resultSet.rows.item(0);
                resolve(row.pictureUri);
              } else {
                resolve(null); // No picture URI found
              }
            },
            error => {
              console.error('Error fetching picture URI: ', error);
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

export { createTable, saveCandidateData, openDatabase, fetchCandidates, saveCandidatePicture, getStoredPicture };