import { createSelector } from 'reselect';

const getLists = state => state.ui.get('lists');

export const getProcessedLists = createSelector(getLists, lists => {
  var listNames = lists.keySeq().toArray();
  return listNames.map(name => {
    var list = lists.get(name);
    return {
      name: name,
      count: list.size
    };
  });
});

const getSalmos = state => {
  return state.ui.get('salmos');
};

const getListFromNavigation = (state, props) => {
  return state.ui.getIn(['lists', props.navigation.state.params.list.name]);
};

export const getSalmosFromList = createSelector(
  getSalmos,
  getListFromNavigation,
  (salmos, list) => {
    var salmosDeList = list.map(nombre => {
      return salmos.find(s => s.nombre == nombre);
    });
    return salmosDeList.toJS();
  }
);