import prisma from "../prisma/client.js";
import sendResponse from '../utils/sendResponse.js'


export const index = async (req, res) => {
  try {
    await prisma.support.findMany().then(support => {
      sendResponse(res, 200, { data: support })
    }).catch(e => {
      sendResponse(res, 500, { message: e })
    })

  } catch (error) {
    sendResponse(res, 500, { message: 'server error' })
  }
}

export const create = async (req, res) => {
  try {
    await prisma.support.create({
      data: {
        domain: req.body.support.domain,
        name: req.body.support.name,
        number: req.body.support.number,
        date: req.body.support.date,
        count: req.body.support.count,
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
    await prisma.support.update({
      where: {
        id: req.body.support.id,
      },
      data: {
        domain: req.body.support.domain,
        name: req.body.support.name,
        number: req.body.support.number,
        date: req.body.support.date,
        count: req.body.support.count,
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
    await prisma.support.delete({
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

export const editCount = async (req, res) => {
  let { count, id } = req.body;
  try {
    await prisma.support.update({
      where: {
        id: id
      },
      data: {
        count: count
      }
    }).then(async good => {
      sendResponse(res, 200, { message: 'good' })
    }).catch(e => {
      sendResponse(res, 500, { message: e })
    })
  } catch (e) {
    sendResponse(res, 500, { message: 'server error' })
  }

}