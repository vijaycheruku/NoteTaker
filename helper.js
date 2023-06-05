// importing required libraries 
const fs = require("fs");
const path = require("path");

// add note function that is adding new data to db.json file
function addNote(dataToAdd, dataInFile) {
   
    //providing id to data so that it can be reused while deleting
    if(dataInFile && dataInFile.length) {
        dataToAdd.id = String(dataInFile.length);
    }
    else {
        dataToAdd.id = '0';
    }
    
    //pushing datato add to existing array and writing to db.json file
    dataInFile.push(dataToAdd);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(dataInFile)
    )
    return dataToAdd;    
}

// delete note function that deletes data from existing array
function deleteNote(idToDelete, dataInFile) {
    dataInFile.splice(idToDelete, 1); 
    let newDataArray = [];
    dataInFile.forEach(( element, index) => {
        element.id = index;
        newDataArray.push(element);
    })
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(newDataArray)
    )
    return newDataArray;
}

module.exports = {
    addNote,
    deleteNote
};