import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid'
import DataGridDemo from './DataGridDemo'
import PostForm from './PostForm'



const UserProfile = () => {
  const [userProfiles, setUserProfiles] = useState([])

  const columns = [
    { field: 'id', headerName: 'id', width: 90 },
    { field: 'username', headerName: 'username', width: 150 },
    { field: 'firstName', headerName: 'firstName', width: 150 },
    { field: 'lastName', headerName: 'lastName', width: 150 },
    { field: 'email', headerName: 'email', width: 150 },
    { field: 'dob', headerName: 'dob', width: 150 },
    { field: 'gender', headerName: 'gender', width: 150 },
  ];

  const fetchUserProfiles = () => {
    console.log("Fetching user profiles")
    axios.get('http://localhost:8080/api/v1/users').then(res => {
      console.log('axios GET success')
      console.log(res)
      setUserProfiles(res.data)
    }).catch(err => {
      console.error('axios GET error')
      console.error(err)
    })
  }

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
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
    // <div>
    //   return Lucas
    // </div>
  )

  // return userProfiles.map(userProfile => (
  //   <div>
  //     <span>{userProfile.id}</span>
  //     <span>{userProfile.username}</span>
  //     <span>{userProfile.firstName}</span>
  //     <span>{userProfile.lastName}</span>
  //     <span>{userProfile.email}</span>
  //     <span>{userProfile.dob}</span>
  //     <span>{userProfile.gender}</span>
  //   </div>
  // ))

}

function App() {
  return (
    <div className="App">
      Hello
      <br />
      <br />
      <PostForm fetchUserProfiles={fetchUserProfiles} />
      <br />
      <br />
      <UserProfile />
      {/* <DataGridDemo /> */}
    </div>
  );
}

export default App;
