/**
 * path /api/notes/
 * @typedef {{ id: string, title: string, text: string, created: number, updated: number }} Note
 */
import { Router } from "express";
import { readFile, writeFile } from 'fs/promises'
import { nanoid } from 'nanoid'

const db = {
  path: __rootdir + '/db/db.json',
  isReady: false,
  async read() {
    if(!db.isReady) {
      const data = await readFile(db.path, 'utf8')
      db.notes = JSON.parse(data)
      db.isReady = true
    }

    return [...db.notes]
  },
  async write() {
    const notes = await db.read()
    await writeFile(db.path, JSON.stringify(notes), 'utf8')

    return notes
  },
  notes: [],
  async correctTime() {
    const notes = await db.read()
    db.notes = notes.map(note => {
      let date = new Date(note.created)
      if(date.toString() === 'Invalid Date') {
        const corrupt = new Date(parseInt(note.created))
        if(corrupt.toString() === 'Invalid Date') {
          console.log(note.created)
          return note
        }
        else date = corrupt
      }
      note.updated = note.created = date.toLocaleString()
      return note
    })

    return db.notes
  },
  async sortNotes() {
    const notes = await db.read()
    db.notes = notes.sort((noteA, noteB) => new Date(noteA.updated).getTime() - new Date(noteB.updated).getTime())

    return db.notes
  },
  async getNotes(id) {
    const notes = await db.read()
    if(!id) return notes;
    return notes.find(note => note.id === id)
  },
  async newNote({ title, text }) {
    if(!title || !text) return false;
    const time = new Date().toLocaleString()
    const notes = await db.read()
    notes.push({
      id: nanoid(7),
      title,
      text,
      created: time,
      updated: time
    })

    db.notes = notes
    await db.sortNotes()
    return await db.write()
  },
  async updateNote(id, { title, text }) {
    const notes = await db.read()
    if(!id) return 0

    const note = notes.find(note => note.id === id)
    if(!note) return 1

    const updateTime = new Date().toLocaleString()

    if(title && note.title !== title) {
      note.title = title
      note.updated = updateTime
    }

    if(text && note.text !== text) {
      note.text = text
      note.updated = updateTime
    }
    db.notes = notes.map(n => n.id === note.id ? note : n)

    await db.sortNotes()
    return await db.write()
  },
  async deleteNote(id) {
    const notes = await db.read()
    let index = -1
    notes.map((note, i) => {
      if(note.id === id) index = i
    })
    if(index === -1) return false
    notes.splice(index, 1)
    db.notes = notes

    return db.write()
  }
}

function ok(res, data) {
  res.json(data);
}

function notFound(res) {
  res.status(404).json({
    code: 404,
    message: 'Not Found'
  })
}

function badRequest(res, reason) {
  res.status(400).json({
    code: 400,
    message: 'Bad Request',
    reason: reason
  })
}

function unhandledException(res) {
  res.status(500).json({
    code: 500,
    message: 'Internal Server Error'
  })
}

const router = Router();

router.all('/fix', (req, res) => {
  db.read()
    .then(db.correctTime)
    .then(db.sortNotes)
    .then(db.write)
    .then(notes => ok(res, notes))
})

router.route('/')
  .get((req, res) => {
    db.getNotes()
      .then(notes => ok(res, notes))
  })
  .post((req, res) => {
    db.newNote(req.body)
      .then(notes => !notes ? badRequest(res, 'Incorrect Arguments') : ok(res, notes))
  })
  .all((req, res) => notFound(res))

router.route('/:id')
  .get((req, res) => {
    db.getNotes(req.params.id)
      .then(note => !note ? notFound(res) : ok(res, note))
  })
  .put((req, res) => {
    db.updateNote(req.params.id, req.body)
      .then(notes => {
        switch(notes) {
          case 0:
            return badRequest(res, 'Incorrect Arguments')
          case 1:
            return notFound(res)
          default:
            return ok(res, notes)
        }
      })
  })
  .delete((req, res) => {
    db.deleteNote(req.params.id)
      .then(notes => !notes ? notFound(res) : ok(res, notes))
  })
  .all((req, res) => notFound(res))

router.all('*', (req, res) => notFound(res))

export default router;