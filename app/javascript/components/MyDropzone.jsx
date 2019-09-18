import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Button } from "grommet";
import styled from "styled-components";
import ReactLoading from "react-loading";

const DropzoneStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

function MyDropzone({ setUploading, uploading, user, fetchPhotos }) {
  const onDrop = useCallback(files => {
    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");

    reader.onload = () => {
      const dataUrl = reader.result;
      // const base64_file = window.btoa(dataUrl);
      const base64_file = dataUrl;
      // debugger;
      console.log(base64_file);
      // debugger;
      const loadedFile = files[0];
      //       lastModified: 1548744455718
      // lastModifiedDate: Tue Jan 29 2019 06:47:35 GMT+0000 (Western European Standard Time) {}
      // name: "test_img.png"
      // path: "test_img.png"
      // size: 4186
      // type: "image/png"

      setUploading(true);
      axios
        .post("/photos", {
          photo: {
            base64_file,
            type: loadedFile.type,
            name: loadedFile.name,
            user_id: user.id
          }
        })
        .then(success => {
          const { data } = success;
          console.log(success);
          setUploading(false);
          fetchPhotos();
        })
        .catch(yo => {
          setUploading(false);
          console.log(yo);
        });
    };

    if (files.length) reader.readAsDataURL(files[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <DropzoneStyled className="DropzoneStyled">
      {uploading ? (
        <ReactLoading color="#7d4cdb" width={50} height={50} />
      ) : (
        <div {...getRootProps({ multiple: false, disabled: uploading })}>
          <input {...getInputProps({ multiple: false, disabled: uploading })} />
          <Button label="Upload your photos or drag them here!" />
        </div>
      )}
    </DropzoneStyled>
  );
}

export default MyDropzone;
