import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  postFormBox: {
    '& > div':  {
      marginBottom: '1rem',
    }
  }
})

export default function PostForm({ fetchUserProfiles, toggleDrawer, user }) {
  const classes = useStyles()
  const [genderValue, setGenderValue] = useState("")

  useEffect(() => {
    user && user.gender && setGenderValue(user.gender)
  }, [])

  const submitForm = async (e) => {
    e.preventDefault()
    
    const formData = {
      username: e.target[0].value,
      firstName: e.target[2].value,
      lastName: e.target[4].value,
      email: e.target[6].value,
      dob: e.target[8].value,
      gender: e.target[10].value
    }

    let url
    let reqMethod
    if (user) {
      url = `http://localhost:8080/api/v1/users/${user.id}`
      reqMethod = 'PUT'
    } else {
      url = 'http://localhost:8080/api/v1/users/add'
      reqMethod = 'POST'
    }

    try {
      const res = await axios({
        method: reqMethod,
        url: url,
        data: formData,
        headers: {
          "Content-Type": "application/json"
        }
    })
      console.log('In PostForm.js: axios POST/PUT success:')
      console.log(res)
      fetchUserProfiles()
      // (null) indicates the 'event' input argument for the curried function (open) => (event) =>
      toggleDrawer(false)(null)
    } catch (err) {
      console.error('In PostForm.js: axios POST error:')
      console.error(err)
    }

  }

  const genderOptions = [
    {
      value: "Male",
      label: "Male"
    },
    {
      value: "Female",
      label: "Female"
    }
  ]

  const handleChange = (event) => {
    setGenderValue(event.target.value)
  }

  const formTitle = user ? 'Update User Profile' : 'Create User Profile'

  return (
      <form onSubmit={submitForm}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          className={classes.postFormBox}
        >
          <Box mt={2}>
            <Typography variant="h3">
              {formTitle}
            </Typography>
          </Box>
          <Box
            width="90%"
            maxWidth={400}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <TextField
              variant="outlined"
              label="Username"
              name="username"
              type="text"
              required
              fullWidth
              margin="normal"
              defaultValue={(user && user.username) ? user.username : ''}
            />
            <TextField
              variant="outlined"
              label="First name"
              name="firstName"
              type="text"
              required
              fullWidth
              margin="normal"
              defaultValue={(user && user.firstName) ? user.firstName : ''}
            />
            <TextField
              variant="outlined"
              label="Last name"
              name="lastName"
              type="text"
              required
              fullWidth
              margin="normal"
              defaultValue={(user && user.lastName) ? user.lastName : ''}
            />
            <TextField
              variant="outlined"
              label="Email"
              name="email"
              type="email"
              required
              fullWidth
              margin="normal"
              defaultValue={(user && user.email) ? user.email : ''}
            />
            <TextField
              variant="outlined"
              label="Date of birth"
              name="dob"
              type="date"
              required
              fullWidth
              margin="normal"
              defaultValue={(user && user.dob) ? user.dob : ''}
            />
            <TextField
              select
              label="Gender"
              name="gender"
              value={genderValue}
              onChange={handleChange}
              fullWidth
              margin="normal"
              defaultValue={(user && user.gender) ? user.gender : ''}
            >
              {genderOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Box display="flex" justifyContent="center" my={2}>
              <Button type="submit" variant="contained" color="primary">{formTitle}</Button>  
            </Box>
          </Box>
        </Box>
      </form>
  )
}