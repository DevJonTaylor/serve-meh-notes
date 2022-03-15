import { nanoid } from 'nanoid'

/**
 * @class
 * @typedef {{ id: string, title: string, text: string, created: number, updated: number }} NoteObject
 * @property {string} _id
 * @property {string} _title
 * @property {string} _text
 * @property {Date} _created
 * @property {Date} _updated
 */
export default class Note {
  _id = nanoid()
  _title = ''
  _text = ''
  _created = new Date()
  _updated = new Date()

  /**
   * Get the id of the current object
   * @returns The id of the Note.
   */
  get id() {
    return this._id
  }

  /**
   * Get the time that the object was created.
   * @returns {number} - Returns the JavaScript timestamp.
   */
  get created() {
    return this._created.getTime()
  }

  /**
   * Returns the time a property was last updated.
   * @returns {number} - Returns the JavaScript timestamp.
   */
  get updated() {
    return this._updated.getTime()
  }

  /**
   * It returns an object with the properties of the Note instance in an Object Literal.
   * @returns {NoteObject}
   */
  get toObject() {
    return {
      id: this._id,
      title: this._title,
      text: this._text,
      created: this._created.getTime(),
      updated: this._updated.getTime()
    }
  }

  /**
   * Serialized NoteObject in a string format.
   * @returns {string}
   */
  toString() {
    return JSON.stringify(this.toObject);
  }

  /**
   It sets the title of the Note, captures a timestamp, and updates the updated property.
   * @param {string} [title]
   @returns {(this | string)} - It returns the title value when an argument is not provided.
   */
  title(title) {
    if(!title) return this._title;
    this._title = title;

    return this;
  }

  /**
   * It sets the text of the Note, captures a timestamp, and updates the updated property.
   * @param {string} [text]
   * @returns {(this | string)} - It returns the text value when an argument is not provided.
   */
  text(text) {
    if(!text) return this._text;
    this._text = text;

    return this;
  }

  /**
   * It takes a JavaScript object and returns a Note object
   * @param {NoteObject}
   * @returns {Note}
   */
  static toNote({ id, title, text, created, updated }) {
    const note = new Note();

    note._id = id;
    note._title = title;
    note._text = text;
    note._created = new Date(created);
    note._updated = new Date(updated);

    return note;
  }

}

