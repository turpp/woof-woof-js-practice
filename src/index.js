let dogBar= document.getElementById('dog-bar')
let dogInfo = document.getElementById('dog-info')
let goodDogFilter = document.getElementById('good-dog-filter')

fetch('http://localhost:3000/pups').then(function(resp){
    return resp.json()
}).then(function(json){
    console.log(json)
    json.forEach(function(dog){
        dogBar.innerHTML += `<span data-id=${dog.id} >${dog.name}</span>`
    })
})

dogBar.addEventListener('click', function(e){
    console.log(e.target.dataset.id)
    fetch(`http://localhost:3000/pups/${e.target.dataset.id}`).then(function(resp){
        return resp.json()
    }).then(function(dog){
        dogInfo.innerHTML = `
        <img src=${dog.image}>
        <h2>${dog.name}</h2>
        <button data-id=${dog.id} data-name=${dog.name} data-image=${dog.image} value=${dog.isGoodDog ? "good" : "bad"}>${dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
        `
    })

})

dogInfo.addEventListener('click', function(e){
    let newStatus = e.target.value=='good' ? false : true
    console.log(newStatus)


    fetch(`http://localhost:3000/pups/${e.target.dataset.id}`, {
        method: 'Put',
        headers: 
        {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: e.target.dataset.id,
            name: e.target.dataset.name,
            isGoodDog: newStatus,
            image: e.target.dataset.image

        })
    }).then(function(resp){
        return resp.json()
    }).then(function(dog){
        dogInfo.innerHTML = `
        <img src=${dog.image}>
        <h2>${dog.name}</h2>
        <button data-id=${dog.id} data-name=${dog.name} data-image=${dog.image} value=${dog.isGoodDog ? "good" : "bad"}>${dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
        `
    })
})

goodDogFilter.addEventListener('click', function(e){
    dogBar.innerHTML=""
    if(e.target.innerText === 'Filter good dogs: OFF'){
        e.target.innerText = "Filter good dogs: ON"
        fetch('http://localhost:3000/pups').then(function(resp){
    return resp.json()
}).then(function(json){
    json.forEach(function(dog){
        if(dog.isGoodDog === true)
        dogBar.innerHTML += `<span data-id=${dog.id} >${dog.name}</span>`
    })
})
    } else {
        fetch('http://localhost:3000/pups').then(function(resp){
    return resp.json()
}).then(function(json){
    json.forEach(function(dog){
        dogBar.innerHTML += `<span data-id=${dog.id} >${dog.name}</span>`
    })
})
        e.target.innerText = "Filter good dogs: OFF"
    }
})