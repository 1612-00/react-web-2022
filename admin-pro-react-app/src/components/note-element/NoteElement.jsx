import React, { useContext } from 'react';
import './noteElement.scss';
import { NoteContext } from './../../contexts/NoteContext';

const NoteElement = ({ id, content, color, date }) => {
    // Note Context
    const {
        noteState: { notes },
        deleteNote,
        setNodeFocus
    } = useContext(NoteContext);

    const editNote = () => {
        notes.forEach((note) => {
            if (note._id === id) {
                setNodeFocus(note);
            }
        });
        document.getElementById('textarea').value = content;
        for (let i = 0; i < notes.length; i++) {
            const noteElement = document.getElementById(
                `note-element-${notes[i]._id}`
            );
            noteElement.classList.remove('focus');
        }
        document.getElementById(`note-element-${id}`).classList.add('focus');
    };

    const deleteNoteById = () => {
        const deleteNoteFunc = async () => {
            await deleteNote(id);
        };
        deleteNoteFunc();
    };

    return (
        <div id={`note-element-${id}`} className='note-element'>
            <div className={`note-element__color ${color}`}></div>
            <div className='note-element__content'>
                <div className='note-element__content__text'>{content}</div>
                <div className='note-element__content__sub'>
                    <div className='note-element__content__sub__time'>
                        {date}
                    </div>
                    <div className='note-element__content__sub__action'>
                        <div
                            className='note-element__content__sub__action__edit'
                            onClick={editNote}
                        >
                            <i class='bx bx-edit'></i>
                        </div>
                        <div
                            className='note-element__content__sub__action__delete'
                            onClick={deleteNoteById}
                        >
                            <i class='bx bx-trash'></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteElement;
