import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import translateServerErrors from "../services/translateServerErrors"

const ShoeShowPage = props => {
  const [shoe, setShoe] = useState({})

  const [shouldRedirect, setShouldRedirect] = useState(false)

  const id = props.match.params.id

  const getShoe = async () => {
    try {
      const response = await fetch(`/api/v1/shoes/${id}`)
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
        const shoeData = await response.json()
        setShoe(shoeData.shoe)
      } catch(err) {
        console.error(`Error in fetch: ${err.message}`)
      }
  }

  const deleteShoe = async () => {
    try {
      const response = await fetch(`/api/v1/shoes/${id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(shoe)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        const body = await response.json()
        setShouldRedirect(true)
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getShoe()
  }, [])

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this shoe? \nThis cannot be undone") == true) {
      deleteShoe()
    } else {
      alert("Delete Cancelled")
    }
  }

  if (shouldRedirect) {
    return <Redirect push to="/" />
  }

  let deleteButton = ''
  if (props.user?.is_admin == true) {
    deleteButton = <button type="button" className="button" onClick={handleDelete}>Delete Shoe</button>
  }

  return (
    <div className = "callout">
      <h1>{shoe.name}</h1>
      <img src={shoe.url} />
      <div>
        <h5>Category: {shoe.category}</h5>
        <h5>Color: {shoe.color}</h5>
        <h6>Description:</h6>
        <p>
          {shoe.description}
        </p>
        <div>
          {deleteButton}
        </div>
      </div>
    </div>
  )
}

export default ShoeShowPage