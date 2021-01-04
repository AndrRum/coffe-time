export const SAVE_SESSIONID = 'SAVE_SESSIONID';
export const SAVE_LOG_PAS = 'SAVE_LOG_PAS';


interface initialState {
    login: string,
    password: string,
    sessionId: any,
}

export const initialState = {
    login: "",
    password: "",
    sessionId: "",
};

export const saveSessionId = (sessionId: any) => {
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

// const initialState = {text: ''}

// //actions
// const CLEAR_TEXT = 'clear textInput field'
// const UPDATE_TEXT = 'update text'

// //actionCreators
// export const clearText = () => {
//     return {
//         type: CLEAR_TEXT,
//     }
// }
// export const updateText = text => {
//     return {
//         type: UPDATE_TEXT,
//         payload: text
//     }
// }


// export const rootReduser = (state = initialState, action) => {
//     switch (action.type) {
//         case CLEAR_TEXT: {
//             return {text: ''}
//         }

//         case UPDATE_TEXT: {
//             const newValue = action.payload
//             return {text: newValue}
//         }
//         default: return state 
//     }
