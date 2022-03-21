import { jest, describe, it, test } from '@jest/globals'
import db from '../../db/db.json'
import Note from '../../Classes/Modals/Note.js'
import {  } from 'lodash';
import fs from 'fs/promises';

jest.mock('fs/promises')
const singleNote = {
  "id": "qygoZoHegrXA",
  "title": "Road Kill (a.k.a. Road Train)",
  "text": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
  "created": "1621071379000",
  "updated": "1643248965000"
}
describe('Notes CRUD Test Suite', () => {
  test('Create RUD', () => {
    it('should add a new note to the collection.', () => {
      // Arrange
      const note = Note.toNote(singleNote);
      const notes = NoteCollection.toNoteCollection(db);

      // Act
      notes.set(note);

      //Assert
      // Follow up with the writeFile mock
    })

    it('should realize that the note already exists and update the note instead.', () => {
      // Arrange
      const noteObject = {
        "id": "dqbb5JLB40",
        "title": "Poltergeist II: The Other Side",
        "text": "Etiam vel gue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
        "created": "1628067890000",
        "updated": "1615698620000"
      }
      const note = Note.toNote(noteObject);
      const notes = new NoteCollection(db);

      // Act
      notes.set(note);

      // Assert
      // Follow up with the writeFile mock
    })
  })

  test('C Read UD', () => {
    it('should return the requested note by the id provided.', () => {
      // Arrange
      const id = 'HxRswd5ahR'

      // Act

      // Assert

    })

    it('should return falsy because the id does not match a record.', () => {})
  })

  test('CR Update D', () => {
    // Arrange


    // Act

    // Assert
  })
  test('CRU Delete', () => {
    // Arrange


    // Act

    // Assert
  })
})


// static toNoteCollection(notes: NoteCollectionObject): NoteCollection
//
// collection: Array<Note>
// set(note: Note): Promise<this>
// delete(id: string): this
// writeFile(...path: Array<string>): Promise<this>
// }