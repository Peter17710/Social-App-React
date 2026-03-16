import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function useFetch(endPoint) {
    const [allData, setallData] = useState([])

async function getData() {

    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/${endPoint}`);
    setallData(data)


    
}
useEffect(()=>{

    getData();

    
},[])

  return {allData}
}
