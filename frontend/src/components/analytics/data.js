import Papa from 'papaparse';

// Function to load and parse the CSV file
const csvToJson = (csvFilePath) => {
  return new Promise((resolve, reject) => {
    fetch(csvFilePath)
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true, // Converts rows to JSON objects using headers as keys
          skipEmptyLines: true,
          complete: (result) => {
            resolve(result.data); // Resolve the JSON data
          },
          error: (error) => {
            reject(error);
          }
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default csvToJson;