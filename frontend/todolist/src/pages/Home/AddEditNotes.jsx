import React, { useState, useEffect } from 'react';
import TagInput from '../../components/Input/TagInput';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosInstance';

const AddEditNotes = ({ noteData, type, getAlltodos, onClose, showToastmessage }) => {

    const [title, setTitle] = useState(noteData?.title || "");
    const [content, setContent] = useState(noteData?.content || "");
    const [tags, setTags] = useState(noteData?.tags || []);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Reset state if noteData changes
        setTitle(noteData?.title || "");
        setContent(noteData?.content || "");
        setTags(noteData?.tags || []);
    }, [noteData]);

    const addNewNote = async () => {
        try {
            const response = await axiosInstance.post("/add-todo", {
                title,
                content,
                tags,
            });
            if (response.data && response.data.note) {
                showToastmessage("Todo Added successfully");
                getAlltodos();
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    };

    const editNote = async () => {
        const noteId = noteData._id;
        try {
            const response = await axiosInstance.put("/edit-todo/" + noteId, {
                title,
                content,
                tags,
            });
            if (response.data && response.data.note) {
                showToastmessage("Todo Updated successfully");
                getAlltodos();
                onClose();
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            }
        }
    };

    const handleAction = () => {
        if (type === 'edit') {
            if (!title) {
                setError("Please Enter title");
                return;
            }
            if (!content) {
                setError("Please Enter content");
                return;
            }
            setError("");
            editNote();
        } else if (type === 'add') {
            if (!title) {
                setError("Please Enter title");
                return;
            }
            if (!content) {
                setError("Please Enter content");
                return;
            }
            setError("");
            addNewNote();
        } else {
            onClose(); 
        }
    };

    return (
        <div className='relative'>
            <button
                className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-500'
                onClick={onClose}
            >
                <MdClose className='text-xl text-slate-400' />
            </button>

            <div className='flex flex-col gap-2'>
                <label className='input-label'>TITLE</label>
                <input
                    type='text'
                    className='text-2xl text-slate-950 outline-none'
                    placeholder='Go to the Gym at 5'
                    value={title}
                    onChange={({ target }) => type !== 'click' && setTitle(target.value)}
                    disabled={type === 'click'}
                />
                <div className='flex flex-col gap-2 mt-4'>
                    <label className='input-label'>CONTENT</label>
                    <textarea
                        type='text'
                        className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
                        placeholder='Content'
                        rows={10}
                        value={content}
                        onChange={({ target }) => type !== 'click' && setContent(target.value)}
                        disabled={type === 'click'}
                    />
                </div>
                <div className='mt-3'>
                    <label className='input-label'>TAGS</label>
                    <TagInput tags={tags} setTags={setTags} disabled={type === 'click'} />
                </div>

                {error && <p className='text-red-500 text-xs pt-4'>{error}</p>}

                <button
                    className={`bg-primary font-medium mt-5 p-3 text-white ${type === 'click' ? 'bg-gray-500' : ''}`}
                    onClick={handleAction}
                >
                    {type === 'edit' ? 'UPDATE' : type === 'add' ? 'ADD' : 'CLOSE'}
                </button>
            </div>
        </div>
    );
}

export default AddEditNotes;
