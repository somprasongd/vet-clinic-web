export const base64ToFile = async (imgUrl, fileName = 'photo') => {
  // url = data:image/png;base64,xxxxxxx
  // Split the base64 string in data and contentType
  const block = imgUrl.split(';')
  // Get the content type of the image
  const contentType = block[0].split(':')[1]
  const res = await fetch(imgUrl)
  const blob = await res.blob()
  const file = new File([blob], fileName, { type: contentType })

  return file
}
