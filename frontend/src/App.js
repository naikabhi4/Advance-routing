// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/Pages/HomePage';
import EventsPage,{loader as eventsLoader} from './components/Pages/EventsPage';
import EventDetailPage,{loader as eventDetailsLoader,action as deleteEventAction} from './components/Pages/EventDetailPage';
import NewEventPage from './components/Pages/NewEventPage';
import Root from './components/Pages/Root';
import EditEventPage from './components/Pages/EditEventPage';
import EventsRoot from './components/Pages/EventsRoot';
import Error from './components/Pages/Error';
import {action as manipulateAction} from './components/Pages/NewEventPage'
import NewsletterPage,{action as newsletterAction } from './components/Newsletter';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement:<Error/>,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: '/events',
          element: <EventsRoot />,
          children: [
            {
              index: true, element: <EventsPage />, loader: eventsLoader
            },
            {
              path:':eventsId',
              id:'event-detail',
              loader:eventDetailsLoader,
              children:[
                {
                  index:true,
                  element:<EventDetailPage/>,
                  action:deleteEventAction
                  
                },
                { path: 'edit', element: <EditEventPage />, action:manipulateAction }
              ]
            },
            { path: 'new', element: <NewEventPage />, action:manipulateAction },
          
          ]

        },
        {
          path: 'newsletter',
          element: <NewsletterPage />,
          action: newsletterAction,
        },

      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App;
