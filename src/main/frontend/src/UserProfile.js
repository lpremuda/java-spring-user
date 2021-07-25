import React, { useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'

export default function UserProfile({ userProfiles, fetchUserProfiles }) 

{

  const columns = [
    { field: 'id', headerName: 'id', width: 90 },
    { field: 'username', headerName: 'username', width: 150 },
    { field: 'firstName', headerName: 'firstName', width: 150 },
    { field: 'lastName', headerName: 'lastName', width: 150 },
    { field: 'email', headerName: 'email', width: 150 },
    { field: 'dob', headerName: 'dob', width: 150 },
    { field: 'gender', headerName: 'gender', width: 150 },
  ];

  useEffect(() => {
    fetchUserProfiles()
  },[])

  const rows = []
  
  userProfiles.map(userProfile => {
    console.log('map iteration')
    rows.push({
      id: userProfile.id,
      username: userProfile.username,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      dob: userProfile.dob,
      gender: userProfile.gender
    })
  })

  console.log('rows START')
  console.log(columns)
  console.log(rows)
  console.log('rows END')

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={15} checkboxSelection />
    </div>
  )

}