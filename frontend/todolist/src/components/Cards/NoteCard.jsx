import React from 'react';
import { MdOutlinePushPin } from 'react-icons/md';
import { MdCreate,MdDelete } from 'react-icons/md';
import moment from 'moment';
import { MdVisibility } from 'react-icons/md';


const NoteCard = ({
    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote,
    onView,
}) => {
    return (
     <div className='border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out'
     style={{
        background: 'linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)',
      }}
     >
        <div className='flex items-center justify-between'>
            <div>
                <h6 className='text-sm font-bold' style={{color:'black'}}>{title}</h6>
                <span className='text-xs' style={{ color: '#8B7D76' }}>{moment(date).format('Do MMM YYYY')}</span>
            </div>
            <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-black': 'text-slate-300'}`} onClick={onPinNote}/>
        </div>
        <p className='text-xs mt-2' style={{ color: '#4B2E2A' }}>{content?.slice(0,60)}</p>

        <div className='flex items-center justify-between mt-2'>
            <div className='text-xs text-slate-500 '>{tags.map((item)=> `#${item}`)}</div>
            <div className='flex items-center gap-2'>
                <MdCreate
                    className="icon-btn hover:text-green-600"
                    onClick={onEdit}
                />
                <MdDelete
                    className="icon-btn hover:text-red-500"
                    onClick={onDelete}
                />
                <MdVisibility
                    className="icon-btn"
                    onClick={onView}
                />
            </div>
        </div>
    </div>
    )
}


export default NoteCard
