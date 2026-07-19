import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

try:
    import google.generativeai as genai
except ModuleNotFoundError:
    genai = None


def get_model():
    if genai is None:
        return None

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None

    try:
        genai.configure(api_key=api_key)
        return genai.GenerativeModel("gemini-2.5-flash")
    except Exception:
        return None


model = get_model()