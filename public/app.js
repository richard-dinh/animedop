axios.get('/api/anime')
.then(({data}) => {
  document.getElementById('name').textContent = data[0].name
  document.getElementById('mal').textContent = data[0].mal
  let results = document.getElementById('results')
  console.log(data)
  for(let i = 1; i< data.length; i++){
    let listItem = document.createElement('li')
    listItem.innerHTML = `
    number: ${data[i].number}<br>
    title: ${data[i].title}<br>
    link: ${data[i].link}<br>
    episode(s): ${data[i].episode || 'N/A'}
    `
    results.append(listItem)
  }
})
.catch(err => console.err(err))