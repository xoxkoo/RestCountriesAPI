import Fetch from "./Fetch.js"
import Country from "./Country.js"

const fetch = new Fetch()

const url = window.location.href.split('?')
const code = url[url.length - 1]

// change title of page
document.title += ' | ' + code

const data = await fetch.loadData('alpha?codes=' + code)

const country = new Country(data[0])
document.querySelector('.country').innerHTML = country.getAll()

