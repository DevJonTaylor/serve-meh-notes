class Note {
  _id = '';
  _title = '';
  _text = '';
  _date;

  constructor({ id, title, text, date }) {
    this._id = id;
    this._title = title;
    this._text = text;
    this._date = new Date(date);
  }

  renderLi() {
    return `<li class="list-group-item" note="${this._id}">
      <span class="list-item-title">${this._title}</span>
      <i class="fas fa-trash-alt float-right text-danger delete-note">
      <span class="list-item-date">${this._date.toLocaleDateString()}</span>
    </i>
  </li>`;
  }

  activate(container) {

  }
}

class Phone {

}