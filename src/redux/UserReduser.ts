const SAVE_SESSIONID = "SAVE_SESSIONID";
const SAVE_LOG_PAS = "SAVE_LOG_PAS";
const SAVE_IMAGE = "SAVE_IMAGE_OR_PHOTO";


interface initialState {
    login: string,
    password: string,
    sessionId: string,
    imageObj: object,
}

const initialState = {
    login: "",
    password: "",
    sessionId: "",
    imageObj: {}
};

export const saveSessionId = (sessionId: string) => {
    return {
        type: SAVE_SESSIONID,
        payload: sessionId
    };
};

export const saveLogPas = (login: string, password: string) => {
    return {
        type: SAVE_LOG_PAS,
        payload: login, password
    };
};

export const saveImage = (imageObj: object) => {
    return {
        type: SAVE_IMAGE,
        payload: imageObj
    }
}

export const UserReduser = (state = initialState, action: any) => {
    switch (action.type) {

        case SAVE_SESSIONID: {
            const newValue = action.payload
            return {

                sessionId: newValue,
            }
         }

        case SAVE_LOG_PAS: {
            
            const newValue = action.payload
            return {
                ...state,
                login: newValue,
                password: newValue,
            }
        }

        case SAVE_IMAGE: {
            const newValue = action.payload
            return {
                imageObj: newValue
            }
        }

        default: return state 
    };
};