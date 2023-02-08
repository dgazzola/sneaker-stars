import React, { useState } from 'react';
import Dropzone from "react-dropzone"

const UserShowPage = (props) => {
    const { id } = props.match.params
    const currentUser = props.currentUser
    const [user, setUser] = useState({
      id: '', email: '', createdAt: '', updatedAt: '', username: '', profileImage: ''
    })
    const [newProfileImage, setNewProfileImage] = useState({
      image: {}
    })

    const [uploadedImage, setUploadedImage] = useState({
      preview: ""
    })

    const handleImageUpload = (acceptedImage) => {
      setNewProfileImage({
        ...newProfileImage,
        image: acceptedImage[0]
      })
  
      setUploadedImage({
        preview: URL.createObjectURL(acceptedImage[0])
      })
    }

      const addProfileImage = async (event) => {
        event.preventDefault()
        const imageAddToProfile = new FormData()
        imageAddToProfile.append("image", newProfileImage.image)
        try {
          const response = await fetch(`/api/v1/users/${user.id}`, {
            method: "PATCH",
            headers: {
            "Accept": "image/jpeg"
            },
            body: imageAddToProfile
          })
          if (!response.ok) {
            throw new Error(`${response.status} (${response.statusText})`)
          }
          const body = await response.json()
          setUser(body.user)
          setUploadedImage({
            preview: ""
          })
        } catch (error) {
          console.error(`Error in add profile image: ${error.message}`)
        }
      }

    const getUser = async () => {
      try {
            const response = await fetch(`/api/v1/users/${id}`)
            if(!response.ok) {
              const errorMessage = `${response.status}: (${response.statusText})`
              throw new Error(errorMessage)
            }
            const body = await response.json()
            setUser(body.user)
          } catch (error) {
            console.error(`error in fetch: ${error}`)
          }
        }

        useState(() => {
          getUser()
        }, [])

    let dropzoneComponent = ""
    if(currentUser?.id === user.id){
      dropzoneComponent = (
        <div className="dropzone">
          <h3>Click below to upload image</h3>

          <form onSubmit={addProfileImage}>
            <Dropzone onDrop={handleImageUpload}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input type="text" {...getInputProps()} />
                    <p>input your profile image here</p>
                  </div>
                </section>
              )}
            </Dropzone>
            <input className='button' type='submit' value='save profile' />
          </form>
          <img src={uploadedImage.preview} className="profile-image-preview" />
        </div>
      )
    }
    
    const DateObject = new Date(user.createdAt)
    const createdDateString= DateObject.toUTCString()
    
    return ( 
        <div className='callout'>
          <div>
              <h1>{user.username}'s Profile</h1>
              <h4>{user.email}</h4>
              <p>This user has been user since {createdDateString}</p>
              <img src={user.profileImage} className='profile-image' alt='profile-image' />
          </div>
          {dropzoneComponent}
        </div>
    );
}
 
export default UserShowPage;