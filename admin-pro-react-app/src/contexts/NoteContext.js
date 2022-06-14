import { createContext, useReducer } from 'react';
import {
    ADD_NOTE,
    DELETE_NOTE,
    UPDATE_NOTE,
    apiUrl,
    GET_ALL_NOTE,
    SET_NOTE_FOCUS,
} from './constant';
import { noteReducer } from './../reducers/NoteReducer';
import axios from 'axios';

export const NoteContext = createContext();

const NoteContextProvider = ({ children }) => {
    const [noteState, dispatch] = useReducer(noteReducer, {
        notes: [],
        noteFocus: null,
    });

    const getAllNotes = async () => {
        try {
            const res = await axios.get(`${apiUrl}/note`);
            if (res.data.success) {
                dispatch({ type: GET_ALL_NOTE, payload: res.data.notes });
                return res.data.notes;
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else console.log(error);
        }
    };

    const addNote = async () => {
        try {
            const newNote = {
                content: 'Content',
                color: 'purple',
                date: new Date().toLocaleDateString(),
            };
            const res = await axios.post(`${apiUrl}/note`, newNote);

            if (res.data.success) {
                dispatch({ type: ADD_NOTE, payload: res.data.note });
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else console.log(error);
        }
    };

    const deleteNote = async (id) => {
        try {
            const res = await axios.delete(`${apiUrl}/note/${id}`);
            if (res.data.success) {
                dispatch({ type: DELETE_NOTE, payload: id });
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else console.log(error);
        }
    };

    const updateNote = async (id, text) => {
        let noteUpdate;
        noteState.notes.forEach((note) => {
            if (note._id === id) {
                noteUpdate = note;
            }
        });
        noteUpdate.content = text;

        try {
            const res = await axios.put(`${apiUrl}/note/${id}`, noteUpdate);
            if (res.data.success) {
                dispatch({ type: UPDATE_NOTE, payload: res.data.note });
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else console.log(error);
        }
    };

    const updateColor = async (id, color) => {
        let noteUpdate;
        noteState.notes.forEach((note) => {
            if (note._id === id) {
                noteUpdate = note;
            }
        });
        noteUpdate.color = color;

        try {
            const res = await axios.put(`${apiUrl}/note/${id}`, noteUpdate);
            if (res.data.success) {
                dispatch({ type: UPDATE_NOTE, payload: res.data.note });
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else console.log(error);
        }
    };

    const setNodeFocus = (note) => {
        try {
            dispatch({ type: SET_NOTE_FOCUS, payload: note });
        } catch (error) {
            console.log(error);
        }
    };

    const NoteContextData = {
        noteState,
        addNote,
        deleteNote,
        updateNote,
        updateColor,
        getAllNotes,
        setNodeFocus,
    };

    return (
        <NoteContext.Provider value={NoteContextData}>
            {children}
        </NoteContext.Provider>
    );
};

export default NoteContextProvider;
