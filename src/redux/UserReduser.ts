const SAVE_USER = "SAVE_USER";
const SAVE_IMAGE = "SAVE_IMAGE_OR_PHOTO";


export interface IReduxState {
    login: string,
    password: string,
    sessionId: string,
    imagePath: string,
}

const initialState:IReduxState = {
    login: "",
    password: "",
    sessionId: "",
    imagePath: "",
};

interface IAction {
    type: string,
    payload: any
}

export const saveUser = (login: string, password: string, sessionId: string): IAction => {
    return {
        type: SAVE_USER,
        payload: { login, password, sessionId }
    };
};


export const saveImage = (imagePath: string) => {
    return {
        type: SAVE_IMAGE,
        payload: imagePath
    };
};

export const UserReduser = (state = initialState, action: IAction): IReduxState => {
    switch (action.type) {

        case SAVE_USER: {
            const {login, password, sessionId} = action.payload;
            return {...state, login, password, sessionId };
         }

        case SAVE_IMAGE: {
            const imagePath =  action.payload;
            return {...state, imagePath};
        }

        default: return state 
    };
};