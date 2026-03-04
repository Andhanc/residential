import axios from 'utils/axios';

export async function filterProducts(filter) {
  return await axios.post('/api/products/filter', { filter });
}

export async function getRelatedProducts(id) {
  return await axios.post('/api/product/related', { id });
}

export async function getProductReviews() {
  return await axios.get('/api/review/list');
}
