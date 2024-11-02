import { Suspense, useEffect, useState } from 'react';
import EventsList from '../EventsList';
import { Await, defer, json, useLoaderData } from 'react-router-dom';


function EventsPage() {
const data = useLoaderData()
const {events} = useLoaderData()
if(data.isError){
  return <p>Error..</p>
}
// const events = data.events
  return (
    // <Suspense fallback={<p style={{textAlign:'center'}}>Loading...</p>}>
    // <Await resolve={events}>
    //   {
    //     (loadedEvents => <EventsList events={loadedEvents}/>)
    //   }
    // </Await>
    // </Suspense>
    <>
      <EventsList events ={events} />
      
    </>
  );
}

export default EventsPage;
// async function loadEvents(){
//   const response = await fetch('http://localhost:8080/events');

//   if (!response.ok) {
//     // return {isError:true, message:"Could not fetch events"}
//     // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
//     //   status: 500,
//     // });
//     throw json({message:'Could not fetched data'},{
//       status:500
//     })
//   } else {
//     // return response
//     const resData = await response.json();
//     return resData.events
//   }
// }

export  async function loader(){
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return {isError:true, message:"Could not fetch events"}
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json({message:'Could not fetched data'},{
      status:500
    })
  } else {
    return response
  }
  // defer({
  //   events: loadEvents()
  // })
}