const mapItem = item => (
  item.values ? { date: item.date, weight: item.values.weight } : { date: item.date });

const fetchWeights = (context) => {
  fetch(`${process.env.API_URL}/api/weights`, { credentials: 'include' })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('could not fetch weights');
    })
    .then((items) => {
      console.log(items);
      const weightList = items
        .map(item => mapItem(item));
      context.commit('setWeightList', weightList);
    })
    .catch((e) => {
      console.error(e);
    });
};


const deleteWeight = (context, date) => {
  fetch(`${process.env.API_URL}/api/weights/${date}`, { method: 'DELETE', credentials: 'include' })
    .then((response) => {
      if (response.ok) {
        fetchWeights(context);
      } else {
        throw new Error('could not delete weight');
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

const addWeight = (context, { date, weight }) => {
  const body = JSON.stringify({ date, values: { weight } });

  fetch(`${process.env.API_URL}/api/weights`,
    {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body,
    })
    .then((response) => {
      if (response.ok) {
        fetchWeights(context);
      } else {
        throw new Error('could not add new record');
      }
    })
    .catch((e) => {
      console.error(e);
    });
};

export default { fetchWeights, deleteWeight, addWeight };
