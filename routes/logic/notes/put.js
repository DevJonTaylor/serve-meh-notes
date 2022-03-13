export function put(req, res) {
  console.log(req.params);
  console.log(req.body);
  req.notes.set(req.noteCheckWithId()).then(res.ok);
}