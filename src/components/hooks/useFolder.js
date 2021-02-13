import { useReducer, useEffect } from 'react'

import { useAuth } from "../../contexts/AuthContext"
import { database } from '../../firebase'

// This is use to prevent typos
const ACTIONS = {
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER: "update-folder",
    SET_CHILD_FOLDERS: "set-child-folder"
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
        case ACTIONS.SET_CHILD_FOLDERS:
            return {
                ...state,
                childFolders: payload.childFolders,
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

    const { currentUser } = useAuth()

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

        // Get the current folder
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

    useEffect(() => {
        // Get the child folder
        // "parentId" is the property to search for
        // "==" to check
        // "folderId" the value to find
        // "orderBy" to sort the folder
        // "onSnapshot" to run the code everytime something change on firebase
        return database.folders
            .where("parentId", "==", folderId)
            .where("userId", "==", currentUser.uid)
            // Query requires an index
            .orderBy("createdAt")
            .onSnapshot(snapshot => {
                dispatch({
                    type: ACTIONS.SET_CHILD_FOLDERS,
                    payload: {
                        childFolders: snapshot.docs.map(database.formatDoc)
                    }
                })
            })
    }, [folderId, currentUser])

    return state
}