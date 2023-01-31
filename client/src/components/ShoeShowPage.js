import React, { useState, useEffect } from "react"

const ShoeShowPage = (props) => {
    // const [shoe, setShoe] = useState()


    useEffect(() => {
        const id = props.match.params.id
        getShoe()
    }, [])


}

export default ShoeShowPage