import prisma from "../prisma/client.js";
import sendResponse from '../utils/sendResponse.js'


export const index = async (req, res) => {
  try {
    await prisma.note.findMany().then(notes => {
      sendResponse(res, 200, { data: notes })
    }).catch(e => {
      sendResponse(res, 500, { message: e })
    })

  } catch (error) {
    sendResponse(res, 500, { message: 'server error' })
  }
}

export const create = async (req, res) => {
  try {
    await prisma.note.create({
      data: {
        body: req.body.note.body
      }
    }).then(good => {
      sendResponse(res, 200, {})
    }).catch(e => {
      sendResponse(res, 500, { message: e })
    })

  } catch (error) {
    sendResponse(res, 500, { message: 'server error' })
  }
}

export const update = async (req, res) => {
  try {
    await prisma.note.update({
      where: {
        id: req.body.note.id,
      },
      data: {
        body: req.body.note.body
      }
    }).then(good => {
      sendResponse(res, 200, {})
    }).catch(e => {
      sendResponse(res, 500, { message: e })
    })

  } catch (error) {
    sendResponse(res, 500, { message: 'server error' })
  }
}

export const destroy = async (req, res) => {
  try {
    await prisma.note.delete({
      where: {
        id: req.body.id,
      },
    }).then(good => {
      sendResponse(res, 200, {})
    }).catch(e => {
      sendResponse(res, 500, { message: e })
    })

  } catch (error) {
    sendResponse(res, 500, { message: 'server error' })
  }
}