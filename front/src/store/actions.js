import Api from '../lib/api';

const api = new Api(process.env.API_URL);

const fetchWeights = context =>
  api.fetchWeights()
    .then((weightList) => { context.commit('setWeightList', weightList); });

const deleteWeight = (context, date) =>
  api.deleteWeight(date)
    .then(() => { fetchWeights(context); });

const addWeight = (context, { date, weight }) =>
  api.addWeight(date, weight)
    .then(() => { fetchWeights(context); });

export default { fetchWeights, deleteWeight, addWeight };
