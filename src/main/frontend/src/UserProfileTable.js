import React, { useEffect } from 'react';

import $ from 'jquery';

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  tableDiv: {
    '& table, th, td': {
      border: '1px solid black'
    }
  },
  rowData: {
    '& > td': {
      textAlign: 'left'
    }
  }
})

export default function UserProfileTable({ userProfiles, toggleDrawer, fetchUserProfiles, setUser }) {
  const classes = useStyles()

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

  async function getBtnClick(rowNum) {
    const id = $(`#row${rowNum} > td:first`)[0].innerText
    const url = `http://localhost:8080/api/v1/users/${id}`
    let result
    try {
      result = await axios({
        method: 'GET',
        url: url
      })
    } catch (err) {
      console.error("Error occured during getBtnClick(): " + err)
    }
  }

  function updateBtnClick(rowNum) {
    const rowElem = $(`#row${rowNum}`)[0]
    const user = {
      id: rowElem.children[0].innerText,
      username: rowElem.children[1].innerText,
      firstName: rowElem.children[2].innerText,
      lastName: rowElem.children[3].innerText,
      email: rowElem.children[4].innerText,
      dob: rowElem.children[5].innerText,
      gender: rowElem.children[6].innerText
    }
    console.log('Setting user')
    setUser(user)
    console.log('Opening drawer')
    toggleDrawer(true)(null)
  }

  async function deleteBtnClick(rowNum) {
    const id = $(`#row${rowNum} > td:first`)[0].innerText
    try {
      const result = await axios({
        method: 'delete',
        url: `http://localhost:8080/api/v1/users/${id}`
      })
      fetchUserProfiles()
    } catch (err) {
      console.error("Error occured during deleteBtnClick(): " + err)
    }
    
  }

  return (
    <>
      <div className={classes.tableDiv} style={{ height: '80vh', width: '100%' }}>
        <table style={{ width: '100%' }}>
          <tr>
            {columns.map(column => (
              <th>{column.headerName}</th>
            ))}
          </tr>
          {rows.map((row, iRow) => (
            <tr id={`row${iRow}`} className={classes.rowData} >
              <td>{row.id}</td>
              <td>{row.username}</td>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.email}</td>
              <td>{row.dob}</td>
              <td>{row.gender}</td>
              <td style={{ border: 'none' }}>
                <Button variant="contained" color="primary"
                  onClick={() => getBtnClick(iRow)}
                >Get</Button>
              </td>
              <td style={{ border: 'none' }}>
                <Button variant="outlined" color="primary"
                  onClick={() => updateBtnClick(iRow)}
                >Update</Button>
              </td>
              <td style={{ border: 'none' }}>
                <Button variant="contained" color="secondary"
                  onClick={() => deleteBtnClick(iRow)}
                >Delete</Button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  )

}