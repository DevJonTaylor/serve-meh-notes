export default class Note {
  id = ''
  title = ''
  text = ''
  _date = Date.now()

  static toNote(obj) {
    const note = new Note();

    for(const [key, val] of Object.entries(obj))

      note[key] = val;

    return note;
  }

  get date() {
    return this._date.toLocaleString();
  }

  set date(date) {
    this._date = {
      'object': () => this._date = date,
      'string': () => this._date = new Date(parseInt(date)),
      'number': () => this._date = new Date(date)
    }[typeof(date)]()
  }
}