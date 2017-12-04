class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  fetchWeights() {
    return fetch(`${this.baseUrl}/api/weights`, { credentials: 'include' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        console.error('could not fetch weights');
        throw new Error('could not fetch weights');
      })
      .then(items => items.map(
        item => ({ date: item.date, weight: item.values ? item.values.weight : null })));
  }

  deleteWeight(date) {
    return fetch(`${this.baseUrl}/api/weights/${date}`, { method: 'DELETE', credentials: 'include' })
      .then((response) => {
        if (!response.ok) {
          console.error('could not delete weight');
          throw new Error('could not delete weight');
        }
      });
  }

  addWeight(date, weight) {
    const body = JSON.stringify({ date, values: { weight } });

    return fetch(`${this.baseUrl}/api/weights`,
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body,
      })
      .then((response) => {
        if (!response.ok) {
          console.error('could not add weight record');
          throw new Error('could not add new record');
        }
      });
  }
}

export default Api;
