import React, { useContext, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SimpleNavigationBar from '../SimpleNavigationBar'
import { CreatorAuthContext } from '../../utils/CreatorAuthContext';
import { useNavigate } from 'react-router-dom';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  Modal.setAppElement('#root');

function AddMedia() {
const { creatorId } = useContext(CreatorAuthContext);
const navigate = useNavigate();

const [files, setFiles] = useState([]);
const [modalIsOpen, setIsOpen] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);

const openModal = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
};

const closeModal = () => {
    setSelectedImage(null);
    setIsOpen(false);
};

  const handleFileDrop = (acceptedFiles) => {
    const updatedFiles = [...files, ...acceptedFiles];
    setFiles(updatedFiles);
  };

  const handleFileDelete = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileDrop,
    accept: 'image/*, video/*',
    multiple: true,
  });


  const handleSubmit = async () => {
    // Validate the number of files and types
    if (files.length !== 4) {
      toast.error('Please upload 3 images and 1 video', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      return;
    }

    const imageFiles = files.filter((file) => file.type.startsWith('image'));
    const videoFiles = files.filter((file) => file.type.startsWith('video'));

    if (imageFiles.length !== 3 || videoFiles.length !== 1) {
        toast.error('Please upload 3 images and 1 video', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
  
      return;
    }

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    formData.append("id", creatorId);


    try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/upload_content_creator_media`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {

        toast.success('Success!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
            });

            setTimeout(()=>{
                navigate('/pending_approval')
            }, 1000)

      } else {
        toast.error('Failed. Server Error!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Failed. Server Error!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  };

  return (
    <div className='w-full min-h-screen bg-black'>
        <ToastContainer />
        <SimpleNavigationBar />

        <p className='text-center text-blue-500 mt-10 text-2xl font-bold'>Upload At least 3 images and 1 video of your previous campaigns to get approved</p>

    <div
    {...getRootProps()}
    className="border-dashed border-2 border-gray-300 bg-neutral-900 p-10 mx-10 lg:mx-32 rounded-lg mt-10 mb-10"
    >
        <input {...getInputProps()} />
        <p className="text-center text-white my-5">Drag & drop images and videos here, or click to select files</p>
    </div>
    <div className='flex justify-center mb-5 '>
        <button onClick={e => {
            e.preventDefault();
            handleSubmit();
        }} 
        className='p-2 text-white bg-blue-600 rounded-xl'
        >
            Submit Media
        </button>
    </div>
    

      <div className="flex flex-wrap gap-10 mx-10 lg:mx-32 justify-center mb-10">
        {files.map((file, index) => (
          <div key={index} className="bg-zinc-950 border border-gray-900 shadow-2xl rounded-2xl p-4 w-full lg:w-1/4">
            {file.type.startsWith('image') ? (
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="object-cover cursor-pointer"
                onClick={() => openModal(URL.createObjectURL(file))}
              />
            ) : file.type.startsWith('video') ? (
              <ReactPlayer
                url={URL.createObjectURL(file)}
                controls
                width="100%"
                height="300px"
              />
            ) : (
              <div>Unsupported file type</div>
            )}
            <button
              onClick={() => handleFileDelete(index)}
              className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className='flex justify-center mb-10 '>
        <button onClick={e => {
            e.preventDefault();
            handleSubmit();
        }} 
        className='p-2 text-white bg-blue-600 rounded-xl'
        >
            Submit Media
        </button>
    </div>

      

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Image Preview Modal"
      >
        {selectedImage && (
          <img src={selectedImage} alt="Selected Image" className="max-w-full max-h-screen" />
        )}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 p-2 bg-red-700 rounded-3xl hover:bg-red-400 text-white hover:text-white"
        >
          X
        </button>
      </Modal>

    </div>
  )
}

export default AddMedia
