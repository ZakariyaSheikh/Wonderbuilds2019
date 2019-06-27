import axios from 'axios';

export function getFilters(object, cb) {
  const url = '/api/v1/filters';
  const categories = object.props.location.state
    ? [object.props.location.state.category.name] : [];

  const categoryToFilter = [];
  if (categories) {
    categories.forEach((category) => {
      categoryToFilter.push({ Category: category });
    });
  }

  axios.get(url, { categories })
    .then((response) => {
      const prices = response.data.filters.filter(filter => filter.is_price === true)[0].values;
      object.setState({ filters: response.data.filters, prices });
      cb(categoryToFilter, prices);
    })
    .catch((error) => {
      console.error(error);
      return (error);
    });
}
