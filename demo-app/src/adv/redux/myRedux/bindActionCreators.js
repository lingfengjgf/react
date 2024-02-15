const bindActionCreator = (creator, dispatch) => {
  return (...args) => dispatch(creator(args));
}

export const bindActionCreators = (creators, dispatch) => {
  const newCreators = {};
  for (let key in creators) {
    newCreators[key] = bindActionCreator(creators[key], dispatch);
  }
  return newCreators;
}
