const generateFileUrl = (filename) => {
  return process.env.SERVER_URL + `/uploads/${filename}`
}

export default generateFileUrl
