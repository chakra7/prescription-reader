import base64
import os
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv

load_dotenv()

class PrescriptionReader():
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash-preview-05-20", google_api_key=os.getenv("GOOGLE_API_KEY"))

    def convert_image_to_text(self, image_data: str) -> str:
        #image_data = f"data:image/jpeg;base64,{base64.b64encode(image_bytes).decode('utf-8')}"

        message = HumanMessage(
            content=[
                {
                    "type": "text",
                    "text": "convert this image to text. Return only the text, no other text. only read the prescriptions in the image. return prescriptions in csv format including headers. the headers should be 'Drug Name', 'Drug Type', 'Dosage', 'Method', 'Frequency' and 'Duration'. if no prescriptions are present, return 'no prescriptions'."
                },
                {
                    "type": "image_url",
                    "image_url": {"url": image_data},
                },
            ]
        )
        ai_msg = self.llm.invoke([message])
        return ai_msg.content

llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash-preview-05-20", google_api_key=os.getenv("GOOGLE_API_KEY"))

def convert_image_to_text(image_bytes):
    image_data = f"data:image/jpeg;base64,{base64.b64encode(image_bytes).decode('utf-8')}"
    #print(image_data)
    message = HumanMessage(
        content=[
            {
                "type": "text",
                "text": "convert this image to text. Return only the text, no other text. only read the precriptions in the image. return prescriptions in csv format including headers. the headers should be 'Drug Name', 'Drug Type', 'Dosage', 'Method', 'Frequency' and 'Duration'. if no prescriptions are present, return 'no prescriptions'."
            },
            {
                "type": "image_url",
                "image_url": {"url": image_data},
            },
        ]
    )
    ai_msg = llm.invoke([message])
    return ai_msg.content