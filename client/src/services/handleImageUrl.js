const handleImageUrl = (url) => {
  if (url.includes("https://sneaker-stars-two.s3.amazonaws.com/blank-profile.jpg")){
    return false
  } else {
    return true
  }
}

export default handleImageUrl