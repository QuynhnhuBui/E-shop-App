export const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST';
export const GET_PRODUCT_LIST_SUCCESS = 'GET_PRODUCT_LIST_SUCCESS';
export const GET_PRODUCT_LIST_ERROR = 'GET_PRODUCT_LIST_ERROR';

export const getProductListAction =()=>{
    return{
        type: GET_PRODUCT_LIST,
    }
}