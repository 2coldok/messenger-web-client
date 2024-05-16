import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
import GlobalStyle from './styles/GlobalStyle.ts'

import TweetService from './service/TweetService.ts'
import AllTweets from './pages/AllTweets.tsx'
import MyTweets from './pages/MyTweets.tsx'

const baseURL = import.meta.env.VITE_BASE_URL;
const tweetService = new TweetService(baseURL);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <AllTweets tweetService={tweetService}  /> },
      { path: '/:username', element: <MyTweets tweetService={tweetService} /> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
