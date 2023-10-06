import React from 'react'; // Import React if not already imported
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Remove 'shallowEqual' as it's not needed here
import './Subbar.css';
import { changeFolder } from '../../../redux/actionCreators/filefolderActionCreater'; // Replace with the actual path

const Subbar = ({ setIsCreateFolderModelOpen, setIsCreateFileModelOpen, setIsFileUploadModelOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentFolder, userFolders } = useSelector((state) => ({
    currentFolder: state.filefolders.currentFolder,
    userFolders: state.filefolders.userFolders,
  }));

  // Find the current folder data separately to avoid nested finds
  const currentFolderData = userFolders.find((folder) => folder.docId === currentFolder);

  const handleNavigate = (link, id) => {
    navigate(link);
    dispatch(changeFolder(id));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light py-2 px-4 navbreadcrumb">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ol className="breadcrumb d-flex align-items-center">
          {currentFolder !== 'root' ? (
            <>
              <button
                onClick={() => handleNavigate('/dashboard', 'root')}
                className="breadcrumb-item btn btn-link text-decoration-none"
              >
                Root
              </button>
              {currentFolderData?.data.path.map((folder, index) => (
                <button
                  key={index}
                  className="breadcrumb-item btn-link text-decoration-none"
                  onClick={() =>
                    handleNavigate(`/dashboard/folder/${userFolders.find((fldr) => folder === fldr.docId).docId}`, userFolders.find((fldr) => folder === fldr.docId).docId)
                  }
                >
                  {userFolders.find((fldr) => folder === fldr.docId).data.name}/
                </button>
              ))}
              <li className="breadcrumb-item active" style={{ paddingRight: '1rem' }}>
                {currentFolderData?.data.name}
              </li>
            </>
          ) : (
            <>
              <li className="breadcrumb-item active">Root</li>
            </>
          )}
        </ol>
      </nav>

      <ul className="navbar-nav ms-auto">
        {/* Add any additional content here */}
      </ul>
    </nav>
  );
};

export default Subbar;
