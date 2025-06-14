import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUploadFile } from "../hooks/hooks";

function FileSelector() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { mutateAsync: uploadFile } = useUploadFile();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("Selected file:", file.name);
            setSelectedFile(file);
            // You can add further processing here, like uploading the file
        }
    };

    const handleUpload = async () => {
        // Implement the upload logic here
        console.log("Upload button clicked");
        if (selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            // Log the file name for debugging
            console.log("Uploading file:", selectedFile.name);
            // Here you would typically send the file to your server or API
            // For example, using FormData and fetch or axios
            try {
                const response = await uploadFile(formData);
                console.log("File uploaded successfully:", response);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            console.error("No file selected for upload.");
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <Input type="file" onChange={handleFileChange} />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    );
}

export default FileSelector;