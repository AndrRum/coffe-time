import { Method } from "axios"

export interface IRequestConfig {
    url: string,
    method: Method,
    baseURL: string,
    data: any,
    headers?: object
}

interface IAuthData {
    email: string,
    password: string,
}

const routes = {
    register: '/api/User/Register',
    auth: '/api/User/Authorization',
    test: '/users'
}

const BASE_URL = 'https://jsonplaceholder.typicode.com'        //TODO: import later

export const createTestConfig = (): IRequestConfig => ({
    baseURL: BASE_URL,
    url: routes.test,
    data: null,
    method: 'GET',
})

const createRegisterConfig = (data: IAuthData): IRequestConfig => ({
    url: routes.register,
    method: "post",
    baseURL: BASE_URL,
    data: data,
    headers: { "Content-Type": "application/json" }
})

const createAuthConfig = (data: IAuthData): IRequestConfig => ({
    url: routes.auth,
    method: "post",
    baseURL: BASE_URL,
    data: data,
    headers: { "Content-Type": "application/json" }
})