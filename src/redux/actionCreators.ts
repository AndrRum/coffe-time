import {DELETE_TEXT} from './actions'
import {SAVE_TEXT} from './actions'


export const deleteText = () => {
    return {
        type: DELETE_TEXT,
    }
}

export const saveText = (text: string) => {
        return {
            type: SAVE_TEXT,
            payload: text
        }
    }
