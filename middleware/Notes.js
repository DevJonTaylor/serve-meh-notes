import { has, get } from "lodash";
import { writeFile, readFile } from "fs/promises";
import { join } from 'path';
import { nanoid } from "nanoid";
const NOTES_PATH = join(__dirname, '../db/db.json');

class Notes {
  static notes;
  static initialize = false;

  static jStr(json) {
    return !json ? JSON.stringify(this.notes) : JSON.stringify(json);
  }

  static write() {
    return writeFile(NOTES_PATH, this.jStr(), 'utf8');
  }

  /**
   *
   * @returns {Promise<string>}
   */
  static read() {
    return readFile(NOTES_PATH, 'utf8');
  }

  static async init() {
    if(this.initialize) return this.notes;

    try {

      const text = await this.read();
      this.notes = !text ? {} : JSON.parse(text);
    } catch(err) {

      this.notes = {};
    }

    this.initialize = true;

    return this.notes;
  }

  static async get(id) {
    await this.init();
    return !id
      ? this.notes
      : get(this.notes, id, {});
  }

  static async set({ id, title, text }) {
    await this.init();
    const date = new Date();
    if(!id) { // new note
      id = nanoid(7);
      if(has(this.notes, id)) return this.set({ title, text });
    }

    this.notes[id] = {id, title, text, date: date.getTime()};

    await this.write();

    return this.notes[id];
  }

  static async drop(id) {
    await this.init();
    let deletedNote;
    if(!id) {
      deletedNote = {...this.notes};
      this.notes = {};
    } else {
      deletedNote = {...this.notes[id]};
      delete this.notes[id];
    }
    await this.write();

    return deletedNote;
  }

  static async has(id) {
    await this.init();
    return has(this.notes, id);
  }
}

export default Notes;