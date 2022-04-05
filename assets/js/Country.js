export default class Country {

    constructor(data) {
        this.data = data
        this.code = (this.data.cioc === undefined) ? this.data.cioc : this.data.cca3
    }

    getBase() {

        return `
        <img src="${this.data.flags.svg}" alt="flag-${this.code}">
        <div class="body">
            <h2 class="title">${this.data.name.common}</h2>
            <ul class="country-information">
                <li><strong>Population:</strong> ${this.formatPopulation(this.data.population)}</li>
                <li><strong>Region:</strong> ${this.data.region}</li>
                <li><strong>Capital:</strong> ${this.data.capital}</li>
            </ul>

        </div>`

    }


    getAll() {        
        return `
            <img src="${this.data.flags.svg}" alt="flag-${this.code}">
            <div class="body">
                <h2 class="title">${this.data.name.common}</h2>
                <h3 class="sub-title">${this.data.name.nativeName[Object.keys(this.data.name.nativeName)[0]].common}</h3>
                <div class="row">
                    <ul>
                        <li><strong>Population:</strong> ${this.formatPopulation(this.data.population)}</li>
                        <li><strong>Region:</strong> ${this.data.region}</li>
                        <li><strong>Sub Region:</strong> ${this.data.subregion}</li>
                        <li><strong>Capital:</strong> ${this.data.capital}</li>
                    </ul>
                    <ul>
                        <li><strong>Top Level Domain:</strong> ${this.data.tld}</li>
                        <li><strong>Currencies:</strong> ${this.formatCurrencies(this.data.currencies)}</li>
                        <li><strong>Languages:</strong> ${this.formatLanguages(this.data.languages)}</li>
                    </ul>
                </div>
    
            </div>`
    
    }

    /**
     * Method converts number to format 00,000,000
     * @param {*} number 
     * @returns string
     */
    formatPopulation(number) {
        let str = number.toString().split('')

        // jumps from right to left by 3 numbers and add comma after hundreads
        for(let i = str.length; i > 0; i -= 3) {
            // we dont want comma after number
            if (i !== str.length)
                str.splice(i, 0, ',')
        }

        return str.join('')
    }


    /**
     * Method formats given object of languages to string
     * @param {object} languages 
     * @returns string
     */
    formatLanguages(languages) {
        let str = ''

        for(const language in languages) {
            str += ' ' + languages[language]  + ','
        }

        return str.slice(0, str.length - 1)
    }

    formatCurrencies(object) {
        let str = ''
        let i = 0
        for(const key in object) {
            str += ' ' + object[key].name  + ' (' + object[key].symbol + '),'
        }

        return str.slice(0, str.length - 1)
    }
}