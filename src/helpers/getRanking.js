const getProducts = () => JSON.parse(localStorage.getItem('ranking'));

if (typeof module !== 'undefined') {
  module.exports = getProducts;
}
