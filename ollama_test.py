import base64
from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage

#llm = OllamaLLM(model="qwen2.5vl:3b")
llm = ChatOllama(model="qwen2.5vl:3b")

def convert_image_to_text(image_bytes):
    #with open(image_path, "rb") as image:
        #f = image.read()
    image_data = f"data:image/jpeg;base64,{base64.b64encode(image_bytes).decode('utf-8')}"

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
    return ai_msg.content