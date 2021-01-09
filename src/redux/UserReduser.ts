export const SAVE_SESSIONID = "SAVE_SESSIONID";
export const SAVE_LOG_PAS = "SAVE_LOG_PAS";


interface initialState {
    login: string,
    password: string,
    sessionId: string,
}

export const initialState = {
    login: "",
    password: "",
    sessionId: "",
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

        default: return state 
    };
};