/**
 * Gets the modified values, compares them with the initial values and
 * returns only those that were modified
 * @param {{}} values - The values due to edit
 * @param {{}} initialValues - The initial values
 * @returns {{}} The modified values
 */
export const getModifiedValues = (values, initialValues) => {
  let modifiedValues = {};

  if (values) {
    Object.entries(values).forEach((entry) => {
      let key = entry[0];
      let value = entry[1];

      if (value !== initialValues[key]) {
        modifiedValues[key] = value;
      }
    });
  }

  return modifiedValues;
};
