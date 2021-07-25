import React, { useState } from 'react'
import './App.css';
import axios from 'axios';

import FormDrawer from './FormDrawer'
import UserProfileTable from './UserProfileTable'

import {} from 'react-router-dom'

import Button from '@material-ui/core/Button';

function App() {
  const [userProfiles, setUserProfiles] = useState([])
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null)

  const toggleDrawer = (open) => (event) => {
    if (event) {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
    }
    setOpen(open);
    if (!open) {
      setUser(null)
    }
  };

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

  return (
    <div className="App">
      <h2>Spring</h2>
      <Button variant="contained" color="primary" onClick={toggleDrawer(true)}>Add New User</Button>
      <FormDrawer
        open={open}
        toggleDrawer={toggleDrawer}
        fetchUserProfiles={fetchUserProfiles}
        user={user}
      />
      <br />
      <br />
      <UserProfileTable
        userProfiles={userProfiles}
        toggleDrawer={toggleDrawer}
        fetchUserProfiles={fetchUserProfiles}
        setUser={setUser}
      />
    </div>
  );
}

export default App;
