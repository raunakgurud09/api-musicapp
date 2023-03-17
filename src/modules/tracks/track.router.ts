import { Router } from 'express'
import authenticatePermission from '../../middleware/authenticate'
import requiresUser from '../../middleware/requiresUser.middleware'
import { uploads } from '../user/user.router'
import {
  allTracks,
  createTrack,
  trackDelete,
  trackDisplay,
  trackUpdate,
  uploadAudio,
  uploadImage
} from './track.controller'

const router = Router()

router.route('/').post(requiresUser, uploads.any(), createTrack).get(allTracks)

router
  .route('/:trackId/audio')
  .post(
    requiresUser,
    authenticatePermission,
    uploads.single('audio'),
    uploadAudio
  )
router
  .route('/:trackId/image')
  .post(
    requiresUser,
    authenticatePermission,
    uploads.single('image'),
    uploadImage
  )

router
  .route('/:trackId')
  .get(requiresUser, trackDisplay)
  .put(requiresUser, authenticatePermission, trackUpdate)
  .delete(requiresUser, authenticatePermission, trackDelete)

export { router as trackRouter }
