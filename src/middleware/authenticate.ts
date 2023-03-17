import { NextFunction, Request, Response } from 'express'
import { get } from 'lodash'
import { Ngo } from '../modules/general/general.model'

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const authorizePermissions = (...roles: any) => {
//   return (req: any, res: Response, next: NextFunction) => {
//     if (!roles.includes(req.user.role)) {
//       return res
//         .status(401)
//         .json({ message: 'Unauthorized to access this route' })
//     }
//     next()
//   }
// }

const authenticatePermission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: any = get(req, 'user')

  const { ngo_name } = req.params

  try {
    const ngo = await Ngo.findOne({ name: ngo_name }).populate('')

    if (!ngo) {
      return res.status(404).json({ message: 'Page not found' })
    }
    // res.status(200).json({ ngo, message: 'hi' })
    // check ngo users edit

    if (!ngo.users.includes(user.email)) {
      return res
        .status(401)
        .json({ message: 'Unauthorized to access this route' })
    }
    return next()
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'error' })
  }
}
export default authenticatePermission
