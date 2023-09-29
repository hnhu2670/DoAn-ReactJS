import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const AvatarForm = () => {
    const [avatar, setAvatar] = useState(null);

    const onDrop = (acceptedFiles) => {
        // Chỉ lấy file đầu tiên trong danh sách file
        const file = acceptedFiles[0];
        setAvatar(file);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div>
            <h1>Avatar Form</h1>
            <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? 'active' : ''}`}
            >
                <input {...getInputProps()} />
                {avatar ? (
                    <img src={URL.createObjectURL(avatar)} alt="Avatar" />
                ) : (
                    <p>Drag and drop or click to select an avatar</p>
                )}
            </div>
        </div>
    );
};

export default AvatarForm;