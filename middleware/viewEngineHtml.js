import { join } from "path";

/**
 * Middleware that acts as a view Engine for HTML files.
 *
 * @param req
 * @param res
 * @param next
 * @returns {void}
 */
export default function(req, res, next) {
  res.sendHtml = htmlFileName => res.sendFile(join(__dirname, `../public/${htmlFileName}.html`));

  next();
}