export const findByTestID = (wrapper, id) => {
    return wrapper.findWhere(x => x.prop('testID') === id);
};
