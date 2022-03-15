import Notes from './restApi/Notes'
import { isUndefined, isString, get } from 'lodash';
import { ok, badRequest } from './restApi/httpStatusResponses';


/**
 * Middleware custom responses and shortcuts by extending the response argument.
 * @param req
 * @param res
 * @param next
 */
export default function restApiHandler(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
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

  return next();
}

class BodyValidator {
 required = [];
 isValid = false;

 constructor(body) {
   const keys = Object.keys(body);

   for(const key of this.required) {
     if(!keys.find(a => a === key)) return;
   }

   this.valid = true;
 }


}