import React from 'react'
import { shallowEqual, useSelector } from 'react-redux';
import { json, useParams } from 'react-router-dom'
import ShowItems from '../ShowItems/ShowItems';

const FolderComponentFile = () => {
    const {folderId} = useParams();

    const {currentFolderData, childFolders, childFiles} = useSelector(
      (state) => ({
        currentFolderData: state.filefolders.userFolders.find(
          (folder) => folder.docId === folderId
        )?.data,
        childFolders: state.filefolders.userFolders.filter(
          (folder) => folder.data.parent === folderId
        ),
        childFiles: state.filefolders.userFiles.filter(
          (file) => file.data.parent === folderId
        ),
      }),
      shallowEqual
    )


    const createFiles = childFiles && childFiles.filter((file) => file.data.url === null)
    const uploadFiles = childFiles && childFiles.filter((file) => file.data.data === null)
    

  return (
    <div>
      {childFolders.length > 0 ? (
        <>
        {childFolders.length > 0 && (
          <ShowItems
          title={"Created Folders"}
          type={"folder"}
          items={childFolders}
          />
        )}
        {createFiles && (
        <ShowItems
        title={"Created Files"}
        type={"file"}
        items={createFiles}
        />
        )}
        {uploadFiles && (
        <ShowItems
        title={"Upload Files"}
        type={"file"}
        items={uploadFiles}
        />
        )}
        </>
      ):(
        <p className='text-center my-5'>Empty Folder</p>
      )}
    </div>
  )
}

export default FolderComponentFile
