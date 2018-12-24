import firebase, { getCurrentUser } from './firebase';

const weightsRef = () => {
  const uid = getCurrentUser().uid;
  return firebase.database().ref(`weights/${uid}`);
};

const weightRef = (date) => {
  const uid = getCurrentUser().uid;
  return firebase.database().ref(`weights/${uid}/${date}`);
};

export const addWeight = (date, weight) =>
  weightRef(date).set({ weight });

export function subscribeForWeights(callback) {
  return weightsRef().on('value', (snapshot) => {
    const val = snapshot.val() || {};

    const weights = Object.keys(val)
      .map(key => ({ date: key, weight: val[key].weight }));

    const sortedWeights = weights.sort((a, b) => (`${b.date}`).localeCompare(a.date));
    callback(sortedWeights);
  });
}

export function unsubscribeForWeights(listener) {
  return weightsRef().off('value', listener);
}

export const deleteWeight = date =>
  weightRef(date).remove();
