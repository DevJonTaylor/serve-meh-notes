import Notes from './Notes'
import { has, isString } from 'lodash';
import { writeFile } from "fs/promises";
import { join } from "path";
import { ok, badRequest } from './httpStatusResponses';


/**
 * Middleware custom responses and shortcuts by extending the response argument.
 * @param req
 * @param res
 * @param next
 */
export default function restApiHandler(req, res, next) {
  res.ok = json => !json
    ? res.json(ok)
    : res.json({ ...ok, data: json });
  res.badRequest = () => res
    .status(badRequest.code)
    .json(badRequest);

  // Collection can be passed without issues.
  req.notes = Notes;

  req.isNote = Notes.has;
  req.setNote = Notes.set;
  req.checkId = () => {
    const id = req.params.id;

    return !id
     ? res.badRequest()
     : { id };
  }
  req.noteCheck = () => {
    const { title, text } = req.body;

    // Are they undefined?
    return !title || !text

      // If they are undefined send .
      ? res.badRequest()

      // Are they something other than strings?
      : !isString(title) || !isString(text)

        // If they are not strings send 400
        ? res.badRequest()

        // If all bad checks are good then send note object back.
        : req.body;
  }
  req.noteCheckWithId = () => {
    // noteCheck performed the check on title and text and passes the body object back if successful.
    const {title, text} = req.body;
    const { id } = req.params


    return !title || !text || !id
      ? res.badRequest()
      : { id, title, text };
  }

  return next();
}