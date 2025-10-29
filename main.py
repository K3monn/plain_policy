from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI
import os

# Load environment variables
load_dotenv()

# Get the API key after loading .env
api_key = os.getenv("OPENAI_API_KEY")


client = OpenAI(api_key=api_key)

app = FastAPI()

# Allow frontend to connect (you’ll need this later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can limit this to your frontend’s URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    text: str

@app.post("/summarize")
async def summarize(input: TextInput):
    """
    Summarize any text using OpenAI GPT model.
    """
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # Small and fast model
            messages=[
                {"role": "system", "content": "You are an AI that summarizes complex legislation, ballots, and policies in simple, neutral language."},
                {"role": "user", "content": input.text}
            ],
            temperature=0.4,
        )
        summary = response.choices[0].message.content
        return {"summary": summary}
    except Exception as e:
        return {"error": str(e)}
