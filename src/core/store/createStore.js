function createStore(initialState) {
  let state = initialState || {};

  const listeners = {};

  return {
    subscribe(key, handler) {
      listeners[key] = (listeners[key] || []).concat(handler);
    },
    unsubscribe(key, handler) {
      listeners[key] = (listeners[key] || []).filter((f) => f !== handler);
    },
    update(key, data) {
      state = {
        ...state,
        [key]: data
      };
      (listeners[key] || []).forEach((handler) => handler(state[key]));
    },
    get(key) {
      return state[key];
    }
  };
}

export default createStore;
