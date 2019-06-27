import axios from "axios";

const mockProduct = {
  products: [
    {
      id: 1,
      name: "Test product",
      description: "Test Desct",
      price: "100.0",
      quantity: "10.0",
      made_in: "Russia",
      url: "/placeholder.jpg",
      category: {
        name: "Test",
        description: "test cat",
        url: "/test.png"
      }
    },
    {
      id: 2,
      name: "Test product 2",
      description: "Test Desct",
      price: "100.0",
      quantity: "10.0",
      made_in: "Russia",
      url: "",
      category: {
        name: "Test",
        description: "test cat",
        url: "/test.png"
      }
    },
    {
      id: 3,
      name: "Test product 3",
      description: "Test Desct",
      price: "100.0",
      quantity: "10.0",
      made_in: "Russia",
      url: "",
      category: {
        name: "Test",
        description: "test cat",
        url: "/test.png"
      }
    },
    {
      id: 4,
      name: "Test product 4",
      description: "Test Desct",
      price: "100.0",
      quantity: "10.0",
      made_in: "Russia",
      url: "",
      category: {
        name: "Test",
        description: "test cat",
        url: "/test.png"
      }
    },
    {
      id: 4,
      name: "Test product 4",
      description: "Test Desct",
      price: "100.0",
      quantity: "10.0",
      made_in: "Russia",
      url: "/placeholder.jpg",
      category: {
        name: "Test",
        description: "test cat",
        url: "/test.png"
      }
    },
    {
      id: 5,
      name: "Test product 5",
      description: "Test Desct",
      price: "100.0",
      quantity: "10.0",
      made_in: "Russia",
      url: "/placeholder.jpg",
      category: {
        name: "Test",
        description: "test cat",
        url: "/test.png"
      }
    },
    {
      id: 6,
      name: "Test product 6",
      description: "Test Desct",
      price: "100.0",
      quantity: "10.0",
      made_in: "Russia",
      url: "/placeholder.jpg",
      category: {
        name: "Test",
        description: "test cat",
        url: "/test.png"
      }
    },
    {
      id: 7,
      name: "Test product 7",
      description: "Test Desct",
      price: "100.0",
      quantity: "10.0",
      made_in: "Russia",
      url: "/placeholder.jpg",
      category: {
        name: "Test",
        description: "test cat",
        url: "/test.png"
      }
    },
    {
      id: 8,
      name: "Test product 7",
      description: "Test Desct",
      price: "100.0",
      quantity: "10.0",
      made_in: "Russia",
      url: "/placeholder.jpg",
      category: {
        name: "Test",
        description: "test cat",
        url: "/test.png"
      }
    },
    {
      id: 9,
      name: "Test product 7",
      description: "Test Desct",
      price: "100.0",
      quantity: "10.0",
      made_in: "Russia",
      url: "/placeholder.jpg",
      category: {
        name: "Test",
        description: "test cat",
        url: "/test.png"
      }
    }
  ]
};

export function getPopularProducts() {
  return new Promise((resolve, reject) => {
    const url = "/api/v1/products/popular";
    axios
      .get(url)
      .then(response => {
        if (
          response.data &&
          response.data.products &&
          response.data.products.length
        ) {
          resolve(response.data.products);
        } else {
          resolve(mockProduct.products);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function getFilteredProducts(params) {
  const url = "/api/v1/products";
  const requestParams = {
    params: {
      filters: params.reduce((result, element) => {
        if (!element.type.match(/page|prices/)) {
          result.push({
            Category: element.name
          });
        }
        return result;
      }, []),
      prices: params.reduce((result, element) => {
        if (element.type === "prices") result.push(element.min, element.max);
        return result;
      }, []),
      page: params.find(item => item.type === "page").value
    }
  };

  return axios
    .get(url, requestParams)
    .then(response => response.data)
    .catch(error => ({ error: error.message }));
}

export function getProductsByCateogory(category) {
  const url = "/api/v1/products";
  const requestParams = {
    params: {
      category: category
    }
  };

  return axios
    .get(url, requestParams)
    .then(response => response.data.products)
    .catch(error => ({ error: error.message }));
}

export function searchProduct(value, limit = 5) {
  return new Promise((resolve, reject) => {
    const url = "/api/v1/search";
    const params = { params: { value, limit } };
    axios
      .get(url, params)
      .then(response => {
        resolve(response.data.products);
      })
      .catch(error => ({ error: error.message }));
  });
}

export function getProduct(id) {
  return new Promise((resolve, reject) => {
    const url = `/api/v1/products/${id}`;
    axios
      .get(url)
      .then(response => {
        if (response.data && response.data.product) {
          resolve(response.data.product);
        } else {
          reject({ message: "Product not found" });
        }
      })
      .catch(error => {
        reject(error.response.data);
      });
  });
}

export function getRelatedProducts(id) {
  return new Promise((resolve, reject) => {
    const url = `/api/v1/products/${id}/related`;
    axios
      .get(url)
      .then(response => {
        resolve(response.data.products);
      })
      .catch(error => {
        reject(error.response.data);
      });
  });
}
