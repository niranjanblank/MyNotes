import React from 'react'
import { Button, Container, Typography, TextField, Radio, RadioGroup,FormControl, FormLabel } from '@material-ui/core'

// used to add custom styles
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { FormControlLabel } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})

export default function Create() {

  const classes = useStyles()
  const history = useHistory()
  const userID = useSelector(state=> state.login.userID)
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState('work')

  const handleSubmit = async (event) =>{
    event.preventDefault()

    if(title == ''){
      setTitleError(true)
    }
    else{
      setTitleError(false)

    }
    if(details == ''){
      setDetailsError(true)
    }else{
      setDetailsError(false)

    }

    if(title && details){
      // console.log(title,details)
      // fetch('http://localhost:8000/notes',{
      //   method: 'POST',
      //   headers: {"Content-type": "application/json"},
      //   body: JSON.stringify({title,details,category})
      // }).then(()=> history.push('/'))
     let note = await axios.post('http://localhost:5000/notes',{
        title,details,userId: userID
      })
     if(note){
       history.push('/')
     }
    }
  }

  return (
    <Container>
      <Typography 
      variant="h6"
      color="textSecondary"
      component="h2"
      gutterBottom
      >
        Create a New Note </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
          onChange={(e)=> setTitle(e.target.value)}
          label="Note Title"
          variant="outlined"
          color="secondary"
          className={classes.field}
          fullWidth
          required
          error={titleError}
          />
          <TextField
          onChange={(e)=> setDetails(e.target.value)}
          label="Details"
          variant="outlined"
          color="secondary"
          className={classes.field}
          fullWidth
          required
          multiline
          rows={4}
          error={detailsError}
          />

        <br/>
        <Button type="submit" 
        color="secondary" 
        variant="contained">Submit</Button>

        </form>
    </Container>
  )
}
