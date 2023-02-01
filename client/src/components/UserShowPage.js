import React, { useState } from 'react';

const UserShowPage = (props) => {
    const { id } = props.match.params
    const [user, setUser] = useState({
      id: '', email: '', createdAt: '', updatedAt: '', username: ''
    })

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

    const DateObject = new Date(user.createdAt)
    const createdDateString= DateObject.toUTCString()

    return ( 
        <div>
            <h1>{user.username}'s Profile</h1>
            <h4>{user.email}</h4>
            <p>This user has been user since {createdDateString}</p>
        </div>
    );
}
 
export default UserShowPage;