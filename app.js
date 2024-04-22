const yargs = require('yargs')
const Notes = require('./notes.js')
const chalk = require('chalk')

yargs.command(
    {
        command: 'add',
        describe: 'adds a note',
        builder:
        {
            title:
            {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            },
            body:
            {
                describe: 'Note body',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            Notes.addNote(argv.title, argv.body)
        }
    }
)
yargs.command(
    {
        command: 'remove',
        describe: 'removes a note',
        builder: {
            title: {
                describe: 'removes a note',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            Notes.removeNote(argv.title)
        }
    }
)

yargs.command(
    {
        command: 'list',
        describe: 'lists the notes',
        handler() {
            Notes.listNotes()
        }
    }
)
yargs.command(
    {
        command: 'read',
        describe: 'reads the notes',
        builder: {
            title: {
                describe: 'note title',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            Notes.readNote(argv.title)
        }
    }
)

yargs.parse()