export const POST_LOGIN = 'POST_LOGIN'
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS'
export const POST_LOGIN_ERROR = 'POST_LOGIN_ERROR'
export const POST_LOGIN_RESET = 'POST_LOGIN_RESET'

export const loginAction = (data) => {
    return {
        type: POST_LOGIN,
        data: data
    }
    }