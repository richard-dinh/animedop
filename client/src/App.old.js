import React, {useEffect} from 'react';
import axios from 'axios'

function App() {

  useEffect(() => {
    axios.get('/api/test')
    .then( ({data}) => {
      console.log(data)
    })
    .catch(err => console.error(err))
  }, [])
  return (
    <h1>Hello World</h1>
  )
}

export default App;
