import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import _ from "lodash"

import translateServerErrors from "./../services/translateServerErrors"

const NewShoeForm = (props) => {
  const defaultForm = {
    name: "",
    color: "",
    category: "",
    description: "",
    url: ""
  }
  const [newShoe, setNewShoe] = useState(defaultForm)
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const addNewShoe = async () => {
    try {
      const response = await fetch('/api/v1/shoes', {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newShoe)
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

  const handleInput = event => {
    setNewShoe({
      ...newShoe,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    addNewShoe()
  }

  if (shouldRedirect) {
    return <Redirect push to="/" />
  }

  const formInputs = Object.keys(defaultForm).map(input => {
    return (         
      <label key={input}>{_.startCase(input)}:
        <input type="text" name={input} value={newShoe[input]} onChange={handleInput}/>
      </label>
  )
  })

  return (
    <div className="callout">
      <h1>New Shoe Form</h1>
      <form onSubmit={handleSubmit}>
        {formInputs}
        <input type="submit" value="submit" className="button" onClick={handleSubmit}/>
      </form>
    </div>

  )
}

export default NewShoeForm