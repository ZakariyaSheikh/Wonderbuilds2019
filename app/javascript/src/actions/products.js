import axios from 'axios';
import filterConstants from '../constants/filterConstants';

const mockProduct = {
  products: [
    {
      id: 1,
      name: 'Test product',
      description: 'Test Desct',
      price: '100.0',
      quantity: '10.0',
      made_in: 'Russia',
      url: '/placeholder.jpg',
      category: {
        name: 'Test',
        description: 'test cat',
        url: '/test.png',
      },
    }, {
      id: 2,
      name: 'Test product 2',
      description: 'Test Desct',
      price: '100.0',
      quantity: '10.0',
      made_in: 'Russia',
      url: '',
      category: {
        name: 'Test',
        description: 'test cat',
        url: '/test.png',
      },
    }, {
      id: 3,
      name: 'Test product 3',
      description: 'Test Desct',
      price: '100.0',
      quantity: '10.0',
      made_in: 'Russia',
      url: '',
      category: {
        name: 'Test',
        description: 'test cat',
        url: '/test.png',
      },
    }, {
      id: 4,
      name: 'Test product 4',
      description: 'Test Desct',
      price: '100.0',
      quantity: '10.0',
      made_in: 'Russia',
      url: '',
      category: {
        name: 'Test',
        description: 'test cat',
        url: '/test.png',
      },
    }, {
      id: 4,
      name: 'Test product 4',
      description: 'Test Desct',
      price: '100.0',
      quantity: '10.0',
      made_in: 'Russia',
      url: '/placeholder.jpg',
      category: {
        name: 'Test',
        description: 'test cat',
        url: '/test.png',
      },
    }, {
      id: 5,
      name: 'Test product 5',
      description: 'Test Desct',
      price: '100.0',
      quantity: '10.0',
      made_in: 'Russia',
      url: '/placeholder.jpg',
      category: {
        name: 'Test',
        description: 'test cat',
        url: '/test.png',
      },
    }, {
      id: 6,
      name: 'Test product 6',
      description: 'Test Desct',
      price: '100.0',
      quantity: '10.0',
      made_in: 'Russia',
      url: '/placeholder.jpg',
      category: {
        name: 'Test',
        description: 'test cat',
        url: '/test.png',
      },
    }, {
      id: 7,
      name: 'Test product 7',
      description: 'Test Desct',
      price: '100.0',
      quantity: '10.0',
      made_in: 'Russia',
      url: '/placeholder.jpg',
      category: {
        name: 'Test',
        description: 'test cat',
        url: '/test.png',
      },
    }, {
      id: 8,
      name: 'Test product 7',
      description: 'Test Desct',
      price: '100.0',
      quantity: '10.0',
      made_in: 'Russia',
      url: '/placeholder.jpg',
      category: {
        name: 'Test',
        description: 'test cat',
        url: '/test.png',
      },
    }, {
      id: 9,
      name: 'Test product 7',
      description: 'Test Desct',
      price: '100.0',
      quantity: '10.0',
      made_in: 'Russia',
      url: '/placeholder.jpg',
      category: {
        name: 'Test',
        description: 'test cat',
        url: '/test.png',
      },
    },
    {
      id: 10,
      name: 'Test product 7',
      description: 'Test Desct',
      price: '100.0',
      quantity: '10.0',
      made_in: 'Russia',
      url: '/placeholder.jpg',
      category: {
        name: 'Test',
        description: 'test cat',
        url: '/test.png',
      },
    },
    {
      id: 11,
      name: 'Test product 7',
      description: 'Test Desct',
      price: '100.0',
      quantity: '10.0',
      made_in: 'Russia',
      url: '/placeholder.jpg',
      category: {
        name: 'Test',
        description: 'test cat',
        url: '/test.png',
      },
    },
  ],
};

const getProducts = (filters, prices, sort) => (dispatch) => {
  const url = '/api/v1/products';
  const params = { params: { filters, prices, sort } };

  // dispatch({
  //     type: filterConstants.UPDATE_FILTERS,
  //     payload: { products: mockProduct.products, activeFilters: filters, prices: prices, sort: sort }
  // })

  axios.get(url, params)
    .then((response) => {
      dispatch({
        type: filterConstants.UPDATE_FILTERS,
        payload: {
          products: response.data.products, activeFilters: filters, prices, sort,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: filterConstants.UPDATE_FILTERS,
        payload: { products: [], activeFilters: filters, prices },
      });
    });
};

export function getProduct(id, object) {
  const url = `/api/v1/products/${id}`;
  axios.get(url)
    .then((response) => {
      const productInStore = object.props.products
                && object.props.products.find(obj => obj.product && (obj.product.id == id));
      if ((productInStore && productInStore.quantity >= response.data.product.quantity) || response.data.product.quantity <= 0) {
        object.setState({ product: response.data.product, available: false });
      } else {
        object.setState({ product: response.data.product });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getPopularProducts(object) {
  const url = '/api/v1/products/popular';
  axios.get(url)
    .then((response) => {
      object.setState({ popularProducts: response.data.products });
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getRelatedProducts(id, object) {
  const url = `/api/v1/products/${id}/related`;
  axios.get(url)
    .then((response) => {
      console.log(response.data);
      object.setState({ relatedProducts: response.data.products });
    })
    .catch((error) => {
      console.log(error);
    });
}

export function searchProducts(value, object, limit = null) {
  const url = '/api/v1/search';
  const params = { params: { value, limit } };
  axios.get(url, params)
    .then((response) => {
      object.setState({ searchProducts: response.data.products });
    })
    .catch((error) => {
      console.log(error);
    });
}

export default {
  getProducts,
};
