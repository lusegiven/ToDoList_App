import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from "react-modal"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../components/ToastMessage/Toast'
import backgroundImage from '../../assets/6068326.jpg';
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import AddTodoImg from '../../assets/add1.png'
import NoResultsImg from '../../assets/noResults.png'

const home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastmsg, setShowToastmsg] = useState({
    isShown: false,
    type: "add",
    message: "",
  });

  const [alltodos, setAlltodos] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  const [isSearch, setIsSearch] = useState(false);

  const handleEdit = (todoDetails) => {
    setOpenAddEditModal({ isShown: true, data: todoDetails, type: "edit" });
  }

  const showToastmessage = (message, type) => {
    setShowToastmsg({
      isShown: true,
      message,
      type,
    });
  }

  const handleCloseToast = () => {
    setShowToastmsg({
      isShown: false,
      message: "",
    });
  }


  //getting the info of the user
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login")
      }
    }
  };

  useEffect(() => {
    getAlltodos();
    getUserInfo();
    return () => { };
  }, []);

  //Getting all the todos
  const getAlltodos = async () => {
    try {
      const response = await axiosInstance.get("/get-todolists");

      if (response.data && response.data.notes) {
        setAlltodos(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again");
    }
  };

  const deleteNote = async (data) => {
    const noteId = data._id
    try {
      const response = await axiosInstance.delete("/delete-todo/" + noteId);
      if (response.data && !response.data.error) {
        showToastmessage("Todo Deleted successfully", 'delete');
        getAlltodos();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log("An unexpected error occured. Please try again");
      }
    }
  };

  //searching for a todo
  const onSearchTodo = async (query) => {
    try {
      const response = await axiosInstance.get("/search-todos", {
        params: { query }
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAlltodos(response.data.notes)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAlltodos();
  }

  //pinning a todo task
  const updateIsPinned = async(noteData) => {
    const noteId = noteData._id
        try {
            const response = await axiosInstance.put("/update-todo-pinned/" + noteId, {
              "isPinned" : !noteData.isPinned,
            });
            if (response.data && response.data.note) {
                showToastmessage("Todo Updated successfully");
                getAlltodos();
            }
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <>
      <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>

        <Navbar userInfo={userInfo} onSearchTodo={onSearchTodo} handleClearSearch={handleClearSearch} />

        <div className='container mx-auto'>
          {alltodos.length > 0 ? (<div className='grid grid-cols-3 gap-4 mt-8 ml-5'>
            {alltodos.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>) : (<EmptyCard
            imgSrc={isSearch ? NoResultsImg : AddTodoImg}
            message={isSearch ? `Oopsiess! No matching results for your Todo` 
                              : `Start creating your first TodoList! Click the 'ADD' button 
                                 below to Get Started! `} />)}
        </div>
        <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-link absolute right-10 bottom-10'
          onClick={() => {
            setOpenAddEditModal({ isShown: true, type: "add", data: null })
          }}>
          <MdAdd className='text-[32px] text-white' />
        </button>

        <Modal
          isOpen={openAddEditModal.isShown}
          onRequestClose={() => { }}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          }}
          contentLabel=""
          className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-12 p-5"
        >
          <AddEditNotes
            type={openAddEditModal.type}
            noteData={openAddEditModal.data}
            onClose={() => {
              setOpenAddEditModal({ isShown: false, type: "add", data: null })
            }}
            getAlltodos={getAlltodos}
            showToastmessage={showToastmessage}
          />
        </Modal>

        <Toast
          isShown={showToastmsg.isShown}
          message={showToastmsg.message}
          type={showToastmsg.type}
          onClose={handleCloseToast}
        />
      </div>
    </>
  );
}


export default home
