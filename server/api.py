from fastapi import FastAPI, UploadFile
from lib.prescription_reader import convert_image_to_text

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

@app.post("/api/uploadfile")
async def create_upload_file(file: UploadFile):
    try:
        res = convert_image_to_text(await file.read())
        return {"response": res}
    except Exception as e:
        return {"error": str(e)}
    