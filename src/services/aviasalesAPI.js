export default class AviaService {
  async getID() {
    const response = await fetch('https://front-test.beta.aviasales.ru/search');
    const data = await response.json();
    return data.searchId;
  }

  async getTickets(id) {
    const response = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${id}`);
    if (response.status === 500) {
      return this.getTickets(id);
    }
    if (response.status === 404) {
      throw new Error('This is end of this line!');
    }
    const data = await response.json();
    return data;
  }
}
