import prisma from "../prisma/client.js";
import sendResponse from '../utils/sendResponse.js'
import syncRequest from 'sync-request'

export const index = async (req, res) => {
  try {
    const statuses = await prisma.status.findMany()

    let data = []


    statuses.forEach(status => {
      let code = null;
      try {
        let response = syncRequest('GET', status.domain)
        code = response.statusCode

      } catch (error) {
        code = 500;
      }
      status.code = code
      data.push(status)
    })


    sendResponse(res, 200, { status: 200, data: data })



  } catch (error) {
    sendResponse(res, 500, { message: 'server error' })
  }
}

export const create = async (req, res) => {
  try {
    await prisma.status.create({
      data: {
        domain: req.body.status.domain
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
    await prisma.status.update({
      where: {
        id: req.body.status.id,
      },
      data: {
        domain: req.body.status.domain
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
    await prisma.status.delete({
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