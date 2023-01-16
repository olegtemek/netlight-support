export default (res, code, data) => {
  return res.status(code).json({ data: data, status: code })
}