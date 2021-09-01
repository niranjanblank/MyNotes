import React from 'react'
import { useEffect,useState } from 'react'
import { Grid } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import { Container } from '@material-ui/core'
import NoteCard from '../components/NoteCard'
import Masonry from 'react-masonry-css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { noteActions } from '../store/noteSlice'

export default function Notes() {
  
  const userID = useSelector(state=>state.login.userID)
  const noteData = useSelector(state=>state.note.data)
  const dispatch = useDispatch()
  useEffect( ()=>{

    // fetch('http://localhost:8000/notes')
    // .then(res => res.json())
    // .then(data=> setNotes(data))

    axios.get('http://localhost:5000/notes/'+userID)
    .then(data => 
      // dispatch(noteActions.setNoteData({data: data.data}))
      // console.log(data.data)
      dispatch(noteActions.setNoteData({data: data.data}))
    )
   
  },[])
  console.log(noteData)
  const handleDelete = async (id)=>{
    // await fetch('http://localhost:8000/notes/'+id,{
    //   method: 'DELETE'
    // })
     const deletedNote = await axios.delete('http://localhost:5000/notes/delete/'+id)

    const newNotes= noteData.filter(note=> id!==note._id)
    dispatch(noteActions.setNoteData({data: newNotes}))

  }

    const breakpoints = {
      default: 3,
      1100: 2,
      700: 1
    }
  return (
    <Container>
      
  
      <Masonry
       breakpointCols={breakpoints}
       className="my-masonry-grid"
       columnClassName="my-masonry-grid_column">
        {noteData.map(note=>(
            <div  key={note._id} > 
            <NoteCard note={note} handleDelete={handleDelete}/>
            </div>
        ))}
     </Masonry>
    </Container>
  )
}
