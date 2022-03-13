
export function post(req, res) {
  req.notes.set(req.noteCheck())
    .then(res.ok);
}