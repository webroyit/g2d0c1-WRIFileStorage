import { useReducer, useEffect } from 'react'

import { database } from '../../firebase'

// This is use to prevent typos
const ACTIONS = {
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER: "update-folder"
}

// Starting path
export const ROOT_FOLDER = { name: "Root", id: null, path: [] }

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFiles: [],
                childFolders: []
            }
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder,
            }
        default:
            return state
    }
}

// 'folderId = null' to set the folderId to null if it undefined
export function useFolder(folderId = null, folder = null) {
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
    });

    // Set the folder
    useEffect(() => {
        dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder }})
    }, [folderId, folder])

    useEffect(() => {
        // Set the folder to null
        if (folderId == null) {
            return dispatch({
              type: ACTIONS.UPDATE_FOLDER,
              payload: { folder: ROOT_FOLDER },
            })
        }

        database.folders
            .doc(folderId)
            .get()
            .then(doc => {
                return dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: { folder: database.formatDoc(doc) }
                })
            }).catch(() => {
                return dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: { folder: ROOT_FOLDER }
                })
            })
    }, [folderId])

    return state
}