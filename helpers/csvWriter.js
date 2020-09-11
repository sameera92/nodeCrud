const createCsvWriter = require('csv-writer').createObjectCsvWriter;

exports.writeCsv = (filePath,header,rec,callback) => {
    const csvWriter = createCsvWriter({
        path: filePath,
        header:header
    });
    const records = rec;
     
    csvWriter.writeRecords(records)       // returns a promise
        .then(() => {
            console.log('...Done');
            callback('done');
        });
}