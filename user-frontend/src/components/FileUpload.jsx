import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Upload, ImageIcon, X } from 'lucide-react';

const FileUpload = ({ darkMode }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [offlineFiles, setOfflineFiles] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post('/api/upload', formData);
      setMessage(response.data.message);
      fetchFiles();
      setFile(null);
    } catch (err) {
      // Handle offline upload
      const reader = new FileReader();
      reader.onloadend = () => {
        const newOfflineFile = {
          id: Date.now(),
          name: file.name,
          dataUrl: reader.result,
        };
        const updatedOfflineFiles = [...offlineFiles, newOfflineFile];
        setOfflineFiles(updatedOfflineFiles);
        localStorage.setItem('offlineFiles', JSON.stringify(updatedOfflineFiles));
        setMessage('File uploaded offline');
        setFile(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await api.get('/api/files');
      setFiles(response.data.files);
    } catch (err) {
      setError(err.response ? err.response.data.error : 'An error occurred');
    }
  };

  const loadOfflineFiles = () => {
    const storedFiles = JSON.parse(localStorage.getItem('offlineFiles')) || [];
    setOfflineFiles(storedFiles);
  };

  useEffect(() => {
    fetchFiles();
    loadOfflineFiles();
  }, []);

  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="space-y-8">
      {message && <div className={`${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700'} border border-green-400 px-4 py-3 rounded`}>{message}</div>}
      {error && <div className={`${darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-700'} border border-red-400 px-4 py-3 rounded`}>{error}</div>}
      <form onSubmit={handleUpload} className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label htmlFor="file-upload" className={`flex flex-col items-center justify-center w-full h-64 border-2 border-teal-300 border-dashed rounded-lg cursor-pointer ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-teal-50 hover:bg-teal-100'}`}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className={`w-10 h-10 mb-3 ${darkMode ? 'text-teal-400' : 'text-teal-500'}`} />
              <p className={`mb-2 text-sm ${darkMode ? 'text-teal-400' : 'text-teal-500'}`}><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className={`text-xs ${darkMode ? 'text-teal-400' : 'text-teal-500'}`}>PNG, JPG, GIF up to 10MB</p>
            </div>
            <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
        {file && (
          <div className={`flex items-center justify-between p-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}>
            <span className="truncate">{file.name}</span>
            <button type="button" onClick={() => setFile(null)} className="text-red-500 hover:text-red-700">
              <X size={20} />
            </button>
          </div>
        )}
        <button type="submit" className={`w-full ${darkMode ? 'bg-teal-600 hover:bg-teal-700' : 'bg-teal-500 hover:bg-teal-600'} text-white font-bold py-2 px-4 rounded`}>
          Upload
        </button>
      </form>

      <div>
        <h3 className="text-2xl font-bold mb-4">Your Photos</h3>
        {files.length === 0 && offlineFiles.length === 0 ? (
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>No photos uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...files, ...offlineFiles].map((file, index) => {
              const fileUrl = file.file_path
                ? `http://localhost:5000/${file.file_path.replace(/\\/g, '/')}`
                : file.dataUrl;

              return (
                <div key={file.id || index} className="relative group">
                  <button
                    onClick={() => openModal(fileUrl)}
                    className="block aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <img
                      src={fileUrl}
                      alt={`Uploaded file ${file.name || index}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <div className={`absolute inset-0 ${darkMode ? 'bg-black' : 'bg-white'} bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    <ImageIcon className={`${darkMode ? 'text-white' : 'text-gray-800'} w-8 h-8`} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="max-w-4xl max-h-full p-4">
            <img src={modalImage} alt="Full size" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

