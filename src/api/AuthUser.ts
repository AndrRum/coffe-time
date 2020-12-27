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

const BASE_URL = 'http://ci2.dextechnology.com:8000'        //TODO: import later

export const createTestConfig = (): IRequestConfig => ({
    baseURL: BASE_URL,
    url: routes.test,
    data: null,
    method: 'GET',
})

export const createRegisterConfig = (data: IAuthData): IRequestConfig => ({
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

// class BaseRequest {
//     protected static handleError = (e: any) => {
//         console.error(e);
//         throw e;
//     };

//     protected fetch(path: string, options: any): Promise<any> {
//         const url = `http://176.31.32.73:8000${path}`;
//         return fetch(url, options);
//     }
// }

// export class UserClientRequest extends BaseRequest {

//     register(item: UserRequest, config: any = {}): Promise<string | null> {

//         return this.fetch(
//             `/api/User/Register`,
//             Object.assign({
//                 headers: {
//                     "Content-Type": "application/json; charset=UTF-8",
//                 },
//                 method: 'POST',
//                 body: JSON.stringify(item)
//             }, config))

//             .then((response) => response.json())
//             .catch(BaseRequest.handleError);
//     }

//     export class UserRequest implements IUserRequest {
//         email?: string | undefined;
//         password: string;
    
//         constructor(data?: IUserRequest) {
//             if (data) {
//                 for (let property in data) {
//                     if (data.hasOwnProperty(property))
//                         (<any>this)[property] = (<any>data)[property];
//                 }
//             }
//         }
    
//         static fromJS(data: any): UserRequest {
//             let result = new UserRequest();
//             result.init(data);
//             return result;
//         }
    
//         init(data?: any) {
//             if (data) {
//                 this.email = data["email"];
//                 this.password = data["password"];
//             }
//         }
    
//         toJSON(data?: any) {
//             data = typeof data === 'object' ? data : {};
//             data["email"] = this.email;
//             data["password"] = this.password;
//             return data;
//         }
//     }
    
//     export interface IUserRequest {
//         email?: string | undefined;
//         password: string;
//     }



// const userRequest = new UserClientRequest();

// export class Auth {
//     static sessionId: string;

//     static async getSessionId(): Promise<string> {
//         try {
//             const item = new UserRequest({email: "buyskih@gmail.com", password: "001"});
//             Auth.sessionId = await userRequest.authorization(item);
//         } catch (e) {
//             alert("Authorization failed");
//         }

//         return Auth.sessionId;
//     }
// }