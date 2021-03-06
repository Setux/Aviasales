const axios = require('axios')

const instance = axios.create({
    baseURL: 'https://front-test.beta.aviasales.ru/'
})
export default class AviaService {
    getID() {
       return instance.get('search')
    }

    async getTickets() {
        const idResponse = await this.getID()
        const id = idResponse.data.searchId
        return instance.get(`tickets?searchId=${id}`)
    }
}