import React from 'react'
import EventForm from '../EventForm'
import { json, redirect } from 'react-router-dom'

function NewEventPage() {
  return (
    <>
    <EventForm method="post"/>
    </>
  )
}

export default NewEventPage
export async function action({request,params}){
  const method = request.method
  const data = await request.formData()
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  }
  let url = "http://localhost:8080/events"
  if(method === 'PATCH'){
    const eventId = params.eventsId
    url = "http://localhost:8080/events/" + eventId
  }
  const response = await fetch(url,{
    method:method,
    headers:{
     'Content-Type':'application/json'
    },
    body: JSON.stringify(eventData)
  })
  if(response.status === 422){
    return response
  }
  if(!response.ok){
    throw json({message:'Could not save event'},{status:500})
  }
  return redirect('/events')
}