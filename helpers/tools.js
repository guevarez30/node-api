const remove = (key, obj) =>{
    const {[key]:__, ...newObj} = obj
    return newObj
}

const pick = (names) => (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => names.includes(key))
  );

module.exports = {
    remove: remove,
    pick: pick
}