import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import prisma from "../prisma/client.js";
import sendResponse from '../utils/sendResponse.js'


export const login = async (req, res) => {
  const body = req.body;

  let user = await prisma.user.findFirst({ where: { email: body.email } })


  if (!user) {
    return sendResponse(res, 401, 'Пользователь не найден')
  }

  let match = await bcrypt.compare(body.password, user.password)

  if (!match) {
    return sendResponse(res, 401, 'Неверный пароль')
  }


  let token = jwt.sign({ email: user.email }, process.env.SECRET, { expiresIn: 60 * 60 * 24 })
  res.cookie('token', token)
  return sendResponse(res, 200, { token: token })

}

export const check = async (req, res) => {
  const token = req.cookies.token;

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return sendResponse(res, 401, 'Токен умер')
    }
    sendResponse(res, 200)
  })
}