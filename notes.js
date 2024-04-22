const fs = require('fs')
const chalk = require('chalk')

const readNote = (title) => {
    const notes=loadNotes()
    const noteToRead= notes.find((note) => note.title===title)

    if(noteToRead){
        console.log(chalk.blue.inverse(noteToRead.title))
        console.log(noteToRead.body)
    }
    else{
        console.log(chalk.red.inverse("Note not found"))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.yellow.inverse('Your notes'))
    notes.forEach((note) => console.log(note.title))
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push(
            {
                title: title,
                body: body
            }
        )
        saveNotes(notes)
        console.log(chalk.green.inverse('new note added!'))
    }
    else {
        console.log(chalk.red.inverse('title already taken'))
    }

}

const removeNote = (title) => {
    const notes = loadNotes()

    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notesToKeep.length < notes.length) {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('removed note!'))
    }
    else {
        console.log(chalk.red.inverse('No note found'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.JSON', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote:readNote
}