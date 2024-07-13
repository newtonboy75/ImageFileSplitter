import express from 'express'
import file_upload from './file_upload'

const router = express.Router()

export default (): express.Router => {
    file_upload(router)
    return router
}