export function all(req, res) {
  req.notes.drop().then(res.ok);
}

export function byId(req, res) {
  req.notes.drop(req.params.id).then(res.ok);
}