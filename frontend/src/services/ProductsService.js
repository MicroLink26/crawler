import Api from '@/services/Api'


export default {
 fetchProducts (params) {
    return Api().get(`/api/v1/products/`+params.type) 
  },
  refreshProducts (params) {
    return Api().get(`/api/v1/products/refresh/`+params.type) 
  }
  }