import React from "react";
import { Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
export default function PickerFile(props) {
  const { file, onFileChange } = props;

  return (
    <div>
      <input
        accept=".xlsx, .xls, .csv"
        style={{ display: "none" }}
        id="contained-button-file"
        onChange={onFileChange}
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        {file ? (
          <p
            style={{
              width: 300,
              paddingTop: 5,
              paddingBottom: 5,
              borderRadius: 5,
              cursor: "pointer",
              border: "1px  dashed gray ",
              textAlign: "center",
            }}
          >
            {file.name}
          </p>
        ) : (
          <IconButton
            style={{
              width: 300,
              paddingTop: 5,
              paddingBottom: 5,
              borderRadius: 5,
              border: "1px  dashed gray ",
            }}
            color="primary"
            component="span"
          >
            <CloudUploadIcon />
          </IconButton>
        )}
      </label>
    </div>
  );
}
