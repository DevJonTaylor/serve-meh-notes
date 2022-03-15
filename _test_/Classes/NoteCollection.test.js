import { describe, it } from '@jest/globals'
import db from '../../db/db.json'
import Note from '../../Classes/Note.js'

describe('Test Suite NoteCollection Class', () => {
  it('should return an object literal.  get toObject(): Array<NoteObject>', () => {
    const notes = new NoteCollection(db)
    expect(notes.toObject).toEqual(db)
  })

  it('Should return a serialized string of the collection', () => {
    const notes = new NoteCollection(db)
    expect(notes.toString()).toEqual(JSON.stringify(db))
  })

  it('Checks the collection for the id passed.  ', () => {
    const notes = new NoteCollection(db)
    expect(notes.has('asdasd')).toBeFalsy()
    expect(notes.has('goZoHegrXAqy')).toBeTruthy()
  })

  it('Should return a Note object when the id exists.', () => {
    const notes = new NoteCollection(db)
    expect(notes.get('goZoHegrXAqy')).toBeInstanceOf(Note)
    expect(notes.get('asdasd')).toBeFalsy();
  })

  it('Should create a new entry into the collection', () => {
    // TODO:  mock writeFile
  })
})


// static toNoteCollection(notes: NoteCollectionObject): NoteCollection
//
// collection: Array<Note>
// set(note: Note): Promise<this>
// delete(id: string): this
// writeFile(...path: Array<string>): Promise<this>
// }