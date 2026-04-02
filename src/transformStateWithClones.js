'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const copyState = Object.assign({}, state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        copyState[key] = action.extraData[key];
      }
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete copyState[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in copyState) {
        delete copyState[key];
      }
    }
    stateHistory.push(Object.assign({}, copyState));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
