import Fetch from "./Fetch.js"
import Country from "./Country.js"

const fetch = new Fetch()

const countries = await fetch.loadData('all')
let country
let elementA

countries.forEach(data => {

    country = new Country(data)

    elementA = document.createElement('a')
    elementA.setAttribute('href', 'country.html?' + country.code) 
    elementA.classList.add('card')
    
    elementA.innerHTML = country.getBase()

    document.querySelector('.card-container').appendChild(elementA)

})

// Init a timeout variable to be used below
let timeout = null;

document.getElementById('search').addEventListener('keyup', async (e) => {

     // Make a new timeout set to go off in 500ms 
     timeout = setTimeout(async function () {
        let countries
        if(e.target.value == '')
            countries = await fetch.loadData('all')
        else 
            countries = await fetch.loadData('name/' + e.target.value)

        document.querySelector('.card-container').innerHTML = ''

        countries.forEach(data => {
    
            country = new Country(data)
        
            elementA = document.createElement('a')
            elementA.setAttribute('href', 'country.html?' + country.code) 
            elementA.classList.add('card')
            
            elementA.innerHTML = country.getBase()
        
            document.querySelector('.card-container').appendChild(elementA)
        
        })
    }, 1000);
})

document.getElementById('filter').addEventListener('change', async (e) => {
    const region = filter.options[filter.selectedIndex].value
    let countries = await fetch.loadData(((region !== 'all') ? 'region/' : '' ) + region)

    document.querySelector('.card-container').innerHTML = ''

    countries.forEach(data => {

        country = new Country(data)
    
        elementA = document.createElement('a')
        elementA.setAttribute('href', 'country.html?' + country.code) 
        elementA.classList.add('card')
        
        elementA.innerHTML = country.getBase()
    
        document.querySelector('.card-container').appendChild(elementA)
    
    })
})

