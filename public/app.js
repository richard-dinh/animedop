axios.get('/api/anime')
.then(data => {
  let results = document.getElementById('results')
  for(let i = 0; i< data.length; i++){
    let listItem = document.createElement('li')
    listItem.innerHTML = `
    name: 
    `
  }
})
.catch(err => console.err(err))