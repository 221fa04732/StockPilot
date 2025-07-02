import express from 'express'
import aiAssistant from '../routes/aiAssistant'

const aiRouter= express.Router()

aiRouter.post('/query', aiAssistant)

export default aiRouter;