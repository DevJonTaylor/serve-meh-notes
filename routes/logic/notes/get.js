export function all(req, res) {
  return req.notes.get().then(res.ok);
}

export function byId(req, res) {
  return req.notes.get(req.params.id).then(res.ok)
}