export default class Fetch {

    constructor() {
        this.spinner = document.getElementById("lds-circle").childNodes[0]
    }

    /**
     * TODO implement methods in one maybe 
     */

    async loadData(parameter) {
        // show loading animation
        this.spinner.style.display = 'inline-block'
    
        return fetch(`https://restcountries.com/v3.1/${parameter}`, {
            method: 'get'
        })
        .then(response => {
            return response.json().then(jsonData => {
                // hide loading 
                this.spinner.style.display = 'none'
                return jsonData
            })
            .catch(err => {
                //error block
                this.loadData(parameter)
            })
        })
    }

    async loadCountry(country) {
        // show loading animation
        this.spinner.style.display = 'inline-block'
    
        return fetch(`https://restcountries.com/v3.1/alpha?codes=${country}`, {
            method: 'get'
        })
        .then(response => {
            return response.json().then(jsonData => {
                // hide loading 
                this.spinner.style.display = 'none'

                return jsonData[0]
        })
        .catch(err => {
            //error block
            this.loadCountry(country)
        })
        })
    }
}