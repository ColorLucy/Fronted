import React, { useEffect } from 'react'
import axiosInstance from '../../../utils/axiosInstance'
function AdminHome() {
  
  useEffect(() => {
    const fun = async () => {
      await axiosInstance.get("/auth/test/")
    }
    //fun()
  }, [])
  return <div className='adminPage' style={{ backgroundColor: "blue", color: "white" }}>AdminHome</div>
}

export default AdminHome