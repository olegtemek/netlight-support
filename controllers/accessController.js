import prisma from "../prisma/client.js";
import sendResponse from '../utils/sendResponse.js'


export const index = async (req, res) => {
  try {
    await prisma.access.findMany().then(access => {
      sendResponse(res, 200, { data: access })
    }).catch(e => {
      sendResponse(res, 500, { message: e })
    })

  } catch (error) {
    sendResponse(res, 500, { message: 'server error' })
  }
}

export const create = async (req, res) => {
  try {
    await prisma.access.create({
      data: {
        site_name: req.body.access.site_name,
        site_admin: req.body.access.site_admin,
        site_ftp: req.body.access.site_ftp,
        site_host: req.body.access.site_host,
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
    await prisma.access.update({
      where: {
        site_id: req.body.access.site_id,
      },
      data: {
        site_name: req.body.access.site_name,
        site_admin: req.body.access.site_admin,
        site_ftp: req.body.access.site_ftp,
        site_host: req.body.access.site_host,
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
    console.log(req.body);
    await prisma.access.delete({
      where: {
        site_id: req.body.site_id,
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