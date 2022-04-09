import Fetch from "./Fetch.js"
import Country from "./Country.js"

const fetch = new Fetch()

const countries = await fetch.loadData('all')
let country

// load everything on blank page
countries.forEach(data => {

    country = new Country(data)
    
    country.htmlElement.innerHTML = country.getBase()

    document.querySelector('.card-container').appendChild(country.htmlElement)

})

// Init a timeout variable to be used below
let timeout = null;

/**
 * Search for countries with search input
 */
document.getElementById('search').addEventListener('keydown', async (e) => {


    // if user pressed enter, start searching immediately
    if (e.key !== 'Enter') {

        // clear timeout so function runs only once after typing
        clearTimeout(timeout)

         // Make a new timeout set to run code 1sec after user stopped typping
        timeout = setTimeout(async function () {
            filterBySearch()
        }, 1000)

    }
    else {
        filterBySearch()
    }

    
})

/**
 * filter countries by region
 */
const filter = document.getElementById('filter')

/**
 * If select elemenent has selected option, load countries from that region
 */
filterByReqion()

/**
 * Filter countries with select element 
 */
filter.addEventListener('change', async (e) => {
    filterByReqion()
})

/**
 * 
 */
async function filterBySearch() {
    let countries
    
    // if input is empty we load everything
    if(e.target.value == '')
        countries = await fetch.loadData('all')
    // try to load what user typed 
    else 
        countries = await fetch.loadData('name/' + e.target.value)

    document.querySelector('.card-container').innerHTML = ''

    // if we get status 404, nothing was found
    if(countries.status !== 404) {
        document.getElementById('not-found').style.display = 'none'
        countries.forEach(data => {
    
            country = new Country(data)
        
            country.htmlElement.innerHTML = country.getBase()

            document.querySelector('.card-container').appendChild(country.htmlElement)
        
        })
    }
    else {
        // nothing was found so we show not found message
        document.getElementById('not-found').style.display = 'flex'
    }
}

async function filterByReqion() {
    // get selected region
    const region = filter.options[filter.selectedIndex].value

    // load data filtered by region
    let countries = await fetch.loadData(((region !== 'all') ? 'region/' : '' ) + region)

    // reset container
    document.querySelector('.card-container').innerHTML = ''

    countries.forEach(data => {

        country = new Country(data)
    
        country.htmlElement.innerHTML = country.getBase()

        document.querySelector('.card-container').appendChild(country.htmlElement)
    
    })
}

