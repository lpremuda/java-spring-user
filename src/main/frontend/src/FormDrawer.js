import React, { useState } from 'react';

import PostForm from './PostForm'

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles({
});

export default function FormDrawer({ open, toggleDrawer, fetchUserProfiles, user }) {
  const classes = useStyles();
  const anchor = "top"

  return (
    <div>
      <Drawer anchor={anchor} open={open} onClose={toggleDrawer(false)}>
        <Box
          width="auto"
          // height="55vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <PostForm
            fetchUserProfiles={fetchUserProfiles}
            toggleDrawer={toggleDrawer}
            user={user}
          />
        </Box>
      </Drawer>
    </div>
  );
}