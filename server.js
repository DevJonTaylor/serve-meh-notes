import express from 'express';
import htmlRoutes from './routes/root';
import notesApi from './routes/notes';
import { restApiHandler, viewEngineHtml } from './middleware'

const PORT = process.env.PORT || 3001;

express()
  .use(express.static('public'))
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(viewEngineHtml)
  .use('/api/notes', notesApi)
  .use('/', htmlRoutes)
  .listen(PORT, () => console.log('http://localhost:3000'));