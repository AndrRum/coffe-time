import {deleteText} from './actionCreators'
import {saveText} from './actionCreators'

export const initialState = {text: ''}

export const UserReduser = (state = initialState, action: any) => {
    switch (action.type) {

        case deleteText: {
            return {text: ''}
         }

        case saveText: {
            const newValue = action.payload
            return {text: newValue}
        }

        default: return state 
    }
}

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
