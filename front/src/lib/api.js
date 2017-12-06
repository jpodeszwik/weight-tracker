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

        if (response.status === 401) {
          throw new Error('unauthorized');
        }

        throw new Error('could not fetch weights');
      })
      .then(items => items.map(
        item => ({ date: item.date, weight: item.values ? item.values.weight : null })));
  }

  deleteWeight(date) {
    return fetch(`${this.baseUrl}/api/weights/${date}`, { method: 'DELETE', credentials: 'include' })
      .then((response) => {
        if (response.status === 401) {
          throw new Error('unauthorized');
        }

        if (!response.ok) {
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
        if (response.status === 401) {
          throw new Error('unauthorized');
        }

        if (!response.ok) {
          throw new Error('could not add new record');
        }
      });
  }

  login(token) {
    return fetch(`${this.baseUrl}/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ token }),
      });
  }
}

export default Api;
