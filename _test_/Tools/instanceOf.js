/**
 *
 * @param {string} desc - The name of the test.
 * @param {Object} theObject - The object that you are testing.
 * @param {Object} theClass - The class that you are testing the instance of.
 */
export const instanceOf = (desc, theObject, theClass) => {
  test(desc, () => {
    expect(theObject).toBeInstanceOf(theClass);
  })
}