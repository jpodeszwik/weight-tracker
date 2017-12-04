import Api from '../lib/api';

const api = new Api(process.env.API_URL);

const fetchWeights = (context) => {
  api.fetchWeights()
    .then((weightList) => {
      context.commit('setWeightList', weightList);
    })
    .catch((e) => {
      console.error(e);
    });
};

const deleteWeight = (context, date) => {
  api.deleteWeight(date)
    .then(() => {
      fetchWeights(context);
    })
    .catch((e) => {
      console.error(e);
    });
};

const addWeight = (context, { date, weight }) => {
  api.addWeight(date, weight)
    .then(() => {
      fetchWeights(context);
    })
    .catch((e) => {
      console.error(e);
    });
};

export default { fetchWeights, deleteWeight, addWeight };
