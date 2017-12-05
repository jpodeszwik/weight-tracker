import Api from '../lib/api';

const api = new Api(process.env.API_URL);

const unauthorizeOrRethrow = (e, context) => {
  if (e.message === 'unauthorized') {
    context.commit('setAuthenticated', false);
  } else {
    throw e;
  }
};

const fetchWeights = context =>
  api.fetchWeights()
    .then((weightList) => { context.commit('setWeightList', weightList); })
    .catch(e => unauthorizeOrRethrow(e, context));

const deleteWeight = (context, date) =>
  api.deleteWeight(date)
    .then(() => { fetchWeights(context); })
    .catch(e => unauthorizeOrRethrow(e, context));

const addWeight = (context, { date, weight }) =>
  api.addWeight(date, weight)
    .then(() => { fetchWeights(context); })
    .catch(e => unauthorizeOrRethrow(e, context));

export default { fetchWeights, deleteWeight, addWeight };
