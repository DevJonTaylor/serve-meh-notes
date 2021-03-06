import express from 'express'
import htmlRoutes from './routes/root'
import notesApi from './routes/notes'
import { viewEngineHtml } from './middleware'
import cors from 'cors'

const PORT = process.env.PORT || 3001

express()
  .use(express.static('public'))
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(viewEngineHtml)
  .use(cors({
    origin: ['http://localhost:3000']
  }))
  .use('/api/notes', notesApi)
  .use('/', htmlRoutes)
  .listen(PORT, () => console.log(`http://localhost:${PORT}`));
