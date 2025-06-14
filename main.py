from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
import os
import base64
from langchain_core.messages import HumanMessage

load_dotenv()

llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash-preview-05-20", google_api_key=os.getenv("GOOGLE_API_KEY"))

local_image_path = "./samples/1_small.jpeg"
with open(local_image_path, "rb") as image:
    f = image.read()
    image_data = f"data:image/jpeg;base64,{base64.b64encode(f).decode('utf-8')}"

    message = HumanMessage(
        content=[
            {"type": "text", "text": "convert this image to text. Return only the text, no other text."},
            {
                "type": "image_url",
                "image_url": {"url": image_data},
            },
        ]
    )
    ai_msg = llm.invoke([message])
    print(ai_msg.content)
