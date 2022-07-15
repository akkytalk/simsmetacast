/* eslint-disable eqeqeq */
export const arrayFilterWithId = (array, id) => {
  return array.filter((item) => item.id == id);
};

export const arrayFilterByKey = (array, key, value) => {
  return array.filter((item) => item[key] == value);
};
export const arrayFilterNotByKey = (array, key, value) => {
  return array.filter((item) => item[key] !== value);
};

export const arrayTotalWithField = (array, field) => {
  return array.reduce((acc, item) => {
    return acc + Number(item[field]);
  }, 0);
};

export const exceptWithValue = (array, excluded, value) => {
  const output = [];
  for (let e of array) {
    if (!excluded.includes(e[value])) output.push(e);
  }
  return output;
};

export const except = (array, excluded) => {
  const output = [];
  for (let e of array) {
    if (!excluded.includes(e)) output.push(e);
  }
  return output;
};

export const includeWithValue = (array, excluded, value) => {
  const output = [];
  for (let e of array) {
    if (excluded.includes(e[value])) output.push(e);
  }
  return output;
};

export const includesArray = (array, excluded) => {
  const output = [];
  for (let e of array) {
    if (excluded.includes(e)) output.push(e);
  }
  return output;
};

// is empty fuction for everything also include array
export const isEmpty = (value) => {
  if (value === null) return true;
  if (value === undefined) return true;
  if (typeof value === "string") {
    if (value.trim().length === 0) return true;
  }
  if (typeof value === "object") {
    if (Object.keys(value).length === 0) return true;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return true;
  }
  return false;
};

// check that it array and array is empty
export const isEmptyArray = (value) => {
  if (Array.isArray(value)) {
    if (value.length === 0) return true;
  }
  return false;
};
