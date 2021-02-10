import { useReducer, useEffect } from 'react'

// This is use to prevent typos
const ACTIONS = {
    SELECT_FOLDER: 'select-folder'
}

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFiles: [],
                childFolders: []
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
}