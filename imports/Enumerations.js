function check(prop, propType, collection) {
  if (collection[prop]) {
    throw new Error(`Enum alredy has ${propType}: ${prop}`);
  } else {
    collection[prop] = 1;
  }
}
function Enum(...args) {
  const names = {};
  const values = {};
  const enumObj = args.reduce((prev, curr) => {
    const name = curr.name || curr;
    check(name, "name", names);
    const value = curr.value || name;
    check(value, "value", values);
    prev[name] = value;
    return prev;
  }, {});

  const handlers = {
    get: function (target, name) {
      if (name in target) {
        return target[name];
      } else {
        throw new Error(`Enum doesn't have key: ${name}`);
      }
    }
  };

  return new Proxy(enumObj, handlers);
}

export const Filter = new Enum("All", "Pending", "Completed");