import axios from "axios";
import { useState } from "react";
import { Avatar } from "@material-tailwind/react";

const ImageUploader = () => {
  const [file, setFile] = useState(null);

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!file) {
      console.log("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dqqfauejn/image/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const data = response.data;
      console.log("Image uploaded:", data.url);
    } catch (error) {
      console.log("Error uploading image", error.response?.data || error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} className="hidden" />
      <span className="text-sm font-medium"><Avatar src={"https://img.icons8.com/?size=100&id=RxzRPd8sH7Ru&format=png&color=000000"} /> Add Image</span>           
      <button onClick={handleImageUpload}>Upload</button>
    </div>
  );
};

export default ImageUploader;
