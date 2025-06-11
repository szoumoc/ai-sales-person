import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize the Gemini model
model = genai.GenerativeModel('gemini-2.0-flash')

def get_gpt_response(prompt):
    try:
        print("Prompt received:", prompt)
        
        # Create the full prompt with system message
        full_prompt = f"You are a helpful assistant.\n\nUser: {prompt}"
        
        response = model.generate_content(full_prompt)
        reply = response.text
        
        print("Gemini Reply:", reply)
        return reply
    except Exception as e:
        print("Gemini API Error:", e)
        return "Sorry, I couldn't process your request."